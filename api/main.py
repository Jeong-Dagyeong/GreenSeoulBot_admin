# from PIL import Image
from fastapi.responses import JSONResponse
from fastapi import FastAPI, Depends, Path, HTTPException, Response, Form, Cookie
from pydantic import BaseModel
from .db.database import engineconn
from .db.models import Admin, Policy
from .db import models, schemas
from . import crud
from typing import List 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = engineconn()
session = engine.sessionmaker()

def get_db():
    db = engine.sessionmaker()
    try:
        yield db
    finally:
        db.close()


# 로그인 페이지 (첫 화면)
@app.get("/green-seoul-bot-admin")
async def home():
    return "home"

# 로그인 
from fastapi import Cookie
class LoginRequest(BaseModel):
    id: str
    password: str


@app.post("/green-seoul-bot-admin")
async def login(
    login_request: LoginRequest,
    response: Response, 
    db: session = Depends(get_db),
):
    id = login_request.id
    password = login_request.password
    print("id for front", id)
    print("password for front:", password)

    admin_info = db.query(Admin).first() 
    if admin_info:
        admin_id = admin_info.id
        admin_password = admin_info.password
        print(admin_info)

        # 쿠키에서 받은 id와 password를 DB의 값과 비교
        if id == admin_id and password == admin_password: 
            return {"status": "success"}
        else:
            response.status_code = 401
            return {
                "status": "failed",
                "error": "관리자 정보가 존재하지 않습니다."
            }
    else:
        response.status_code = 404
        return {
            "status": "failed",
            "error": "관리자 정보를 찾을 수 없습니다."
        }
    

class PostData(BaseModel):
    title: str
    content: str
    district_name: str

# 정책 조회 
@app.get("/districts/{district_name}/detail")
async def choose_districts(district_name: str, id: int, db: session = Depends(get_db)):
    # district_name을 기준으로 정책 정보 조회
    
    if id==1:
        db_policy = db.query(models.Policy).filter(models.Policy.district_name == district_name).first()
        if db_policy:
            return db_policy
        else:
            return {
                "status": "failed",
                "error": "정책 정보를 조회할 수 없습니다."
            }
    if id==2:
        db_largeWaste = db.query(models.LargeWaste).filter(models.LargeWaste.district_name == district_name).first()
        if db_largeWaste:
            return db_largeWaste
        else:
            return {
                "status": "failed",
                "error": "수수료를 조회할 수 없습니다."
            }
        

# GET 요청을 별도의 엔드포인트로 설정
# router.push(`/districts/${district_name}/list?district_name=${district_name}`); // 삭제 후 목록 페이지로 이동
# 삭제 후 목록 페이지로 이동 
@app.get("/districts/{district_name}/list")
async def get_district_policy(district_name: str, db: session = Depends(get_db)):
    db_model = models.Policy

    # district_name을 기준으로 정책 정보 조회
    policy = db.query(db_model).filter(db_model.district_name == district_name).first()
    
    if policy:
        return policy
    else:
        raise HTTPException(status_code=404, detail="정책 정보를 조회할 수 없습니다.")


@app.patch("/districts/{district_name}/update", response_model=schemas.PolicyUpdate)
async def update_policy(
    response: Response,
    id: int,
    district_name: str,
    policy_update: schemas.PolicyUpdate,
    db: session = Depends(get_db)
):
    print(id, district_name)
    
    if id == 1:
        db_policy = db.query(models.Policy).filter(models.Policy.district_name == district_name).first()
        # if db_policy is None:
        #     raise HTTPException(status_code=404, detail="Policy not found")
        if policy_update.contents is not None:
            db_policy.contents = policy_update.contents  # contents 수정
        db.commit()
        return db_policy

    elif id == 2:
        db_largeWaste = db.query(models.LargeWaste).filter(models.LargeWaste.district_name == district_name).first()
        if db_largeWaste is None:
            db_largeWaste = models.LargeWaste(
                district_name = district_name,
                large_waste = "예시",
                policy = policy_update.policy
            )
            db.add(db_largeWaste)
        if policy_update.policy is not None:
            db_largeWaste.policy = policy_update.policy  # policy 수정
        db.commit()
        return db_largeWaste

    else:
        raise HTTPException(status_code=400, detail="Invalid ID")


# 정책 삭제
@app.delete("/districts/{district_name}/delete", response_model=schemas.PolicyUpdate)
async def delete_policy(id: int, district_name: str, db: session = Depends(get_db)):
    # db_policy = crud.delete_policy(db=db, district_name=district_name)

    if id==1:
        db_policy = db.query(models.Policy).filter(models.Policy.district_name == district_name).first()
        if db_policy is None:
            raise HTTPException(status_code=404, detail="Policy not foune")
        else:
            db.delete(db_policy)
            db.commit()
            return db_policy
    elif id==2:
        db_largeWaste = db.query(models.LargeWaste).filter(models.LargeWaste.district_name == district_name).first()
        if db_largeWaste is None:
            raise HTTPException(status_code=404, detail="Policy not foune")
        else:
            db.delete(db_largeWaste)
            db.commit()
            return db_largeWaste


# 정책 추가
@app.post("/green-seoul-bot-admin/districts/write{district_name}", response_model=schemas.PolicyCreate)
async def create_policy(district_name: str, contents: str, db: session = Depends(get_db)):
    # Policy 생성
    db_policy = crud.update_policy_content(db=db, new_district_name=district_name, new_contents=contents)
    if db_policy is None:
        raise HTTPException(status_code=400, detail="Failed to create policy")
    return db_policy