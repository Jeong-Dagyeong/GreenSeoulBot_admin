'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'

export default function WritePost() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const district_name = searchParams.get('district_name') // 쿼리에서 district_name 가져오기

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!title || !content || !district_name) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      // Axios POST 요청
      const response = await axios.post(`green-seoul-bot-admin/districts/write?district_name=${district_name}`, {
        title,
        content,
        userId: 1, // 사용자 ID는 예제로 고정
        district_name,
      })

      if (response.status === 200) {
        alert('게시글이 작성되었습니다.')
        console.log(district_name)

        // 작성 완료 후 페이지 이동
        router.push(`/districts/list?district_name=${district_name}`)
      } else {
        alert('게시글 작성에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('게시글 작성 중 오류 발생:', error)

      // Axios 에러 처리
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data?.message || '서버 오류가 발생했습니다. 다시 시도해주세요.')
      } else {
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoBack = () => {
    router.push(`/districts/list?district_name=${district_name}`)
  }

  return (
    <Box sx={{ padding: '100px' }}>
      <Typography variant="h4" gutterBottom>
        정책정보 작성
      </Typography>
      <TextField
        fullWidth
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          mb: 2,
          mt: 2,
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#304D30', // 포커스된 라벨 색상
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ccc', // 기본 테두리 색상
            },
            '&:hover fieldset': {
              borderColor: '#304D30', // 호버 시 테두리 색상
            },
            '&.Mui-focused fieldset': {
              borderColor: '#304D30', // 포커스 시 테두리 색상
            },
          },
        }}
      />
      <TextField
        fullWidth
        label="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={10}
        sx={{
          mb: 2,
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#304D30', // 포커스된 라벨 색상
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ccc', // 기본 테두리 색상
            },
            '&:hover fieldset': {
              borderColor: '#304D30', // 호버 시 테두리 색상
            },
            '&.Mui-focused fieldset': {
              borderColor: '#304D30', // 포커스 시 테두리 색상
            },
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" sx={{ backgroundColor: '#304D30' }} onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '작성 중...' : '작성'}
        </Button>
        <Button variant="contained" onClick={handleGoBack} sx={{ backgroundColor: '#304D30' }}>
          목록으로 돌아가기
        </Button>
      </Box>
    </Box>
  )
}
