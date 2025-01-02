'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, Checkbox, Typography } from '@mui/material'
import { Sheet } from '@mui/joy'

export default function Main() {
  const router = useRouter()
  const district = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ]

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
    district.reduce((acc, name) => {
      acc[name] = false
      return acc
    }, {} as Record<string, boolean>)
  )

  const handleCheckboxChange = (name: string) => {
    const selectedCount = Object.values(checkedState).filter((isChecked) => isChecked).length

    if (selectedCount >= 1 && !checkedState[name]) {
      alert('1개만 선택할 수 있습니다.')
      return
    }

    setCheckedState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }))
  }

  const handleSubmit = async () => {
    const selectedDistricts = Object.keys(checkedState).filter((name) => checkedState[name])
    console.log(selectedDistricts)

    const query = selectedDistricts.map(encodeURIComponent).join(',')
    console.log(query)

    router.push(`/districts/list?district_name=${query}`)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // 화면 전체 높이
          backgroundColor: '#f8f8f8',
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: '70rem',
            maxHeight: 600,
            overflowY: 'auto',
            padding: 2,
            display: 'flex',
            flexDirection: 'column', // 세로 정렬
            alignItems: 'center', // 가로 중앙 정렬
            gap: 2,
            backgroundColor: '#ffffff', // 선택사항: 큰 박스 배경색
            position: 'relative', // 버튼의 위치 고정을 위한 상대 위치
          }}
        >
          {/* 체크박스 영역 */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            {district.map((name) => (
              <Box
                key={name}
                sx={{
                  width: '9rem', // 고정 너비
                  height: '3rem', // 고정 높이
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  backgroundColor: checkedState[name] ? '#304D30' : '#FFFFFF',
                  color: checkedState[name] ? '#FFFFFF' : '#000000',
                  '&:hover': {
                    backgroundColor: checkedState[name] ? '#203320' : '#f0f0f0',
                  },
                }}
                onClick={() => handleCheckboxChange(name)}
              >
                <Checkbox
                  disableRipple
                  checked={checkedState[name]}
                  onChange={() => handleCheckboxChange(name)}
                  sx={{
                    display: 'none',
                  }}
                />
                <Typography noWrap sx={{ textAlign: 'center' }}>
                  {name}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* 확인 버튼 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 'auto', // 남은 공간을 밀어냄 (버튼이 박스 아래에 위치)
              width: '100%', // 버튼이 중앙 정렬될 수 있도록 부모 박스의 너비를 전체로 설정
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#304D30', // 버튼 배경색
                color: '#FFFFFF', // 텍스트 색상
                width: '8rem', // 버튼 너비
                '&:hover': {
                  backgroundColor: '#203320', // 호버 시 색상
                },
              }}
              onClick={handleSubmit}
            >
              확인하기
            </Button>
          </Box>
        </Sheet>
      </Box>
    </>
  )
}
