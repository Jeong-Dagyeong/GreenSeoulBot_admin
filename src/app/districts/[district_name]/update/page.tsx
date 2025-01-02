'use client';

import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

interface Post {
    id: number;
    district_name: string;
    contents?: string;
    large_waste?: string;
    policy?: string;
}

export default function UpdatePost() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = Number(searchParams.get('id'));
    const district_name = searchParams.get('district_name') || '알 수 없는 지역';

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchPostDetails = async () => {
                try {
                    const response = await axios.get(
                        // console.log(id),
                        `http://127.0.0.1:8001/districts/${district_name}/detail?id=${id}&district_name=${district_name}`
                    );
                    if (response.status === 200) {
                        setPost(response.data);
                    } else {
                        console.error('Failed to fetch post details:', response.status);
                    }
                } catch (error) {
                    console.error('Failed to fetch post details:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchPostDetails();
        }
    }, [id]);

    const handleUpdate = async () => {
        if (!post) {
            console.warn('게시물 데이터가 없습니다.');
            return;
        }
        console.log(id);
        try {
            const response = await axios.patch(
                `http://127.0.0.1:8001/districts/${district_name}/update?id=${id}&district_name=${district_name}`,
                {
                    contents: post.contents,
                    large_waste: post.large_waste,
                    policy: post.policy,
                }
            );

            if (response.status === 200) {
                alert('게시물이 수정되었습니다.');
                router.push(`/districts/list?district_name=${district_name}`);
            } else {
                alert('수정에 실패했습니다.');
                console.error('Failed to update post, response status:', response.status);
            }
        } catch (error) {
            console.error('Failed to update post:', error);
            alert('게시물 수정 중 오류가 발생했습니다.');
        }
    };

    const handleChange = (field: keyof Post, value: string) => {
        if (post) {
            setPost({ ...post, [field]: value });
        }
    };

    if (loading) return <CircularProgress />;
    if (!post) return <Typography>게시물을 찾을 수 없습니다.</Typography>;

    return (
        <Box sx={{ padding: '100px' }}>
            <Typography variant="h5" gutterBottom>
                {district_name} 수정
            </Typography>
            <TextField
                fullWidth
                label="제목"
                InputProps={{ readOnly: true }}
                value={
                    id === 1 ? `${district_name}의 정책정보 입니다.` : `${district_name}의 대형폐기물 수수료 입니다.`
                }
                variant="outlined"
                sx={{
                    mb: 2,
                    mt: 2,
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#304D30',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc',
                        },
                        '&:hover fieldset': {
                            borderColor: '#304D30',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#304D30',
                        },
                    },
                }}
            />
            <TextField
                fullWidth
                label="내용"
                value={id === 1 ? post.contents || '' : post.policy || ''}
                onChange={(e) =>
                    id === 1 ? handleChange('contents', e.target.value) : handleChange('policy', e.target.value)
                }
                multiline
                rows={10}
                variant="outlined"
                sx={{
                    mb: 2,
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#304D30',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc',
                        },
                        '&:hover fieldset': {
                            borderColor: '#304D30',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#304D30',
                        },
                    },
                }}
            />
            <Button variant="contained" onClick={handleUpdate} sx={{ backgroundColor: '#304D30' }}>
                수정 완료
            </Button>
        </Box>
    );
}
