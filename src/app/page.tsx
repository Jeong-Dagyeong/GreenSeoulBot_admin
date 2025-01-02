'use client';

import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import Cookies from 'js-cookie'; // js-cookie 라이브러리 import

export default function Home() {
    const router = useRouter();
    const [form, setForm] = useState({
        id: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // const handleLogin = async () => {
    //     setError(null);

    //     // 기본 검증
    //     if (!form.id || !form.password) {
    //         setError('아이디와 비밀번호를 모두 입력해주세요.');
    //         return;
    //     }
    //     console.log(form);

    //     try {
    //         // API 요청
    //         const response = await axios.post('http://127.0.0.1:8000/green-seoul-bot-admin', form, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         console.log(form);
    //         console.log(response);

    //         if (response.status === 200) {
    //             const data = response.data;

    //             // 쿠키에 아이디와 비밀번호 저장
    //             // Cookies.set('id', form.id, { expires: 1 }); // 쿠키 1일 유효
    //             // Cookies.set('password', form.password, { expires: 1 }); // 쿠키 1일 유효

    //             // console.log(Cookies.get());

    //             // 로그인 성공 -> /districts로 이동
    //             router.push('/districts');
    //         } else {
    //             setError(response.data?.message || '로그인에 실패했습니다.');
    //         }
    //     } catch (error) {
    //         console.error('로그인 요청 중 오류가 발생했습니다:', error);
    //         if (axios.isAxiosError(error) && error.response) {
    //             setError(error.response.data?.message || '로그인 요청에 실패했습니다.');
    //         } else {
    //             setError('서버와의 연결에 실패했습니다.');
    //         }
    //     }
    // };

    const handleLogin = async () => {
        setError(null);

        // 기본 검증
        if (!form.id || !form.password) {
            setError('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            // API 요청
            const response = await axios.post(
                'http://127.0.0.1:8001/green-seoul-bot-admin',
                {
                    id: form.id,
                    password: form.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Response:', response);

            if (response.status === 200) {
                // 로그인 성공 -> /districts로 이동
                router.push('/districts');
            } else {
                setError(response.data?.message || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('로그인 요청 중 오류가 발생했습니다:', error);
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.message || '로그인 요청에 실패했습니다.');
            } else {
                setError('서버와의 연결에 실패했습니다.');
            }
        }
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // 가로 중앙 정렬
                flexDirection: 'column',
                height: '100vh', // 화면 전체 높이를 차지
                // border: '1px solid green',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <TextField
                label="ID"
                name="id"
                variant="standard"
                sx={{
                    width: '300px',
                    height: '80px',
                    // '& .MuiInputBase-input': {
                    //   color: '#304D30', // 입력 텍스트 색상 변경
                    // },
                    '& .MuiInputLabel-root': {
                        color: '#304D30', // 라벨 색상 기본 상태
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: '#ccc', // 기본 상태
                    },
                    '& .MuiInput-underline:hover:before': {
                        borderBottomColor: '#304D30', // 호버 시 색상
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#304D30', // 포커스 시 색상
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#304D30', // 포커스된 라벨 색상
                    },
                }}
                value={form.id}
                onChange={handleChange}
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                variant="standard"
                sx={{
                    width: '300px',
                    // '& .MuiInputBase-input': {
                    //   color: '#304D30', // 입력 텍스트 색상 변경
                    // },
                    '& .MuiInputLabel-root': {
                        color: '#304D30', // 라벨 색상 기본 상태
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: '#ccc', // 기본 상태
                    },
                    '& .MuiInput-underline:hover:before': {
                        borderBottomColor: '#304D30', // 호버 시 색상
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#304D30', // 포커스 시 색상
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#304D30', // 포커스된 라벨 색상
                    },
                }}
                value={form.password}
                onChange={handleChange}
            />

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
            <Button
                variant="contained"
                disableElevation
                sx={{
                    width: '300px',
                    height: '50px',
                    marginTop: '50px',
                    backgroundColor: '#304D30',
                    fontSize: '15px',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#203320', // 호버 시 색상 설정 (더 어두운 톤)
                    },
                }}
                onClick={handleLogin}
            >
                로그인
            </Button>
        </Box>
    );
}
