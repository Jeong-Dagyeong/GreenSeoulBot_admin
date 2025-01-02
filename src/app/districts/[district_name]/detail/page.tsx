'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, TextField, CircularProgress, Button } from '@mui/material';
import { useEffect, useState } from 'react';

interface Post {
    id: number;
    district_name: string;
    contents?: string;
    large_waste?: string;
    policy?: string;
}

export default function DistrictDetail() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get('id'));
    const district_name = searchParams.get('district_name');
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            const fetchPostDetails = async () => {
                try {
                    // 쿼리스트링을 URL에 직접 포함
                    const response = await axios.get(
                        `http://127.0.0.1:8001/districts/${district_name}/detail?id=${id}&district_name=${district_name}`
                    );

                    if (response.status === 200) {
                        setPost(response.data); // 상태 업데이트
                    } else {
                        console.error('Failed to fetch post details:', response.status);
                    }
                } catch (error) {
                    console.error('Failed to fetch post details:', error);
                } finally {
                    setLoading(false); // 로딩 상태 업데이트
                }
            };

            fetchPostDetails();
        }
    }, [id, district_name]);

    // const handleDelete = async () => {
    //     if (!id || !district_name) return;

    //     const confirmDelete = window.confirm('정말로 게시물을 삭제하시겠습니까?');
    //     if (!confirmDelete) return;

    //     try {
    //         const response = await axios.delete(
    //             `http://127.0.0.1:8000/districts/${district_name}/delete?id=${id}&district_name=${district_name}`
    //         );

    //         if (response.status === 200) {
    //             alert('게시물이 삭제되었습니다.');
    //             router.push(`/districts/${district_name}/delete?id=${id}&district_name=${district_name}`);
    //         } else {
    //             alert('게시물 삭제에 실패했습니다.');
    //             console.error('Failed to delete post, response status:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Failed to delete post:', error);
    //         alert('게시물 삭제 중 오류가 발생했습니다.');
    //     }
    // };

    // 에러
    // 1. 삭제 성공 시 리다이렉트 문제: '게시물이 삭제되었습니다.'라는 메시지와 함께 db반영도 되지만 목록 페이지로 넘어가지 않고 404에러 발생

    const handleDelete = async () => {
        if (!id || !district_name) return; // id와 district_name이 없으면 함수 종료

        const confirmDelete = window.confirm('정말로 게시물을 삭제하시겠습니까?');
        if (!confirmDelete) return; // 사용자가 삭제를 취소하면 함수 종료

        try {
            // 삭제 요청을 보낼 API 경로
            const response = await axios.delete(
                `http://127.0.0.1:8001/districts/${district_name}/delete?id=${id}&district_name=${district_name}`
            );

            // 삭제 성공 시
            if (response.status === 200) {
                alert('게시물이 삭제되었습니다.');
                router.push(`/districts/list?district_name=${district_name}`); // 하이 url 수정 완료
            } else {
                alert('게시물 삭제에 실패했습니다.');
                console.error('Failed to delete post, response status:', response.status);
            }
        } catch (error) {
            // 오류 발생 시
            console.error('Failed to delete post:', error);
            alert('게시물 삭제 중 오류가 발생했습니다.');
        }
    };

    const handleGoBack = () => {
        router.push(`/districts/list?district_name=${district_name}`);
    };

    if (loading) return <CircularProgress />;
    if (!post) return <Box>게시물을 찾을 수 없습니다.</Box>;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '50px',
                backgroundColor: '#f8f8f8',
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start', // 왼쪽 정렬
                    width: '100%',
                    maxWidth: '600px', // 부모 박스 너비 제한
                    marginBottom: '5px', // 목록 버튼과 상세 정보 박스 간격
                }}
            >
                <Button
                    variant="text"
                    sx={{
                        color: '#304D30', // 텍스트 색상
                        fontSize: '18px', // 텍스트 크기 키움
                        fontWeight: 'bold', // 텍스트 굵기 추가
                        '&:hover': {
                            color: '#304D30', // 호버 시 기존 색상 유지 (변화 없음)
                            backgroundColor: 'transparent', // 배경색 변화 없음
                        },
                    }}
                    onClick={handleGoBack}
                >
                    목록으로
                </Button>
            </Box>
            <Box
                sx={{
                    padding: '10px',
                    maxWidth: '600px',
                    width: '100%',
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Box sx={{ marginBottom: '20px' }}>
                    <TextField
                        fullWidth
                        label="분류"
                        value={post.id}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                pointerEvents: 'none',
                                '& fieldset': {
                                    borderColor: '#ccc',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ccc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#ccc',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#304D30',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#304D30',
                            },
                        }}
                    />
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                    <TextField
                        fullWidth
                        label="제목"
                        value={
                            id === 1
                                ? `${district_name}의 정책정보 입니다.`
                                : `${district_name}의 대형폐기물 수수료 입니다.`
                        }
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                pointerEvents: 'none',
                                '& fieldset': {
                                    borderColor: '#ccc',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ccc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#ccc',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#304D30',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#304D30',
                            },
                        }}
                    />
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                    <TextField
                        fullWidth
                        label="작성자"
                        value="관리자"
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                pointerEvents: 'none',
                                '& fieldset': {
                                    borderColor: '#ccc',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ccc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#ccc',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#304D30',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#304D30',
                            },
                        }}
                    />
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                    <TextField
                        fullWidth
                        label="내용"
                        value={id === 1 ? post.contents : post.policy}
                        InputProps={{ readOnly: true }} // 읽기 전용 설정
                        multiline
                        rows={9}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#ccc', // 기본 테두리 색상
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ccc', // 호버 시 테두리 색상
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#ccc', // 포커스 시 테두리 색상
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#304D30', // 라벨 색상
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#304D30', // 포커스된 라벨 색상
                            },
                        }}
                    />
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                    <TextField
                        fullWidth
                        label="작성 시간"
                        value={new Date().toLocaleString()}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                pointerEvents: 'none',
                                '& fieldset': {
                                    borderColor: '#ccc',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ccc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#ccc',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#304D30',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#304D30',
                            },
                        }}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                    marginTop: '20px',
                    maxWidth: '600px',
                    width: '100%',
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#304D30',
                        color: '#FFFFFF',
                        minWidth: '100px',
                        '&:hover': {
                            backgroundColor: '#203320',
                        },
                    }}
                    onClick={() =>
                        router.push(`/districts/${district_name}/update?id=${id}&district_name=${district_name}`)
                    }
                >
                    수정
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    sx={{
                        minWidth: '100px',
                    }}
                    onClick={handleDelete}
                >
                    삭제
                </Button>
            </Box>
        </Box>
    );
}
