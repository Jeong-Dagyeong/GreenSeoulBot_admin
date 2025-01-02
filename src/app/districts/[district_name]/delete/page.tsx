'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Box, Typography, Button } from '@mui/material'
import { useEffect } from 'react'

export default function DeleteConfirmation() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = Number(searchParams.get('id'))
  const district_name = searchParams.get('district_name')

  useEffect(() => {
    if (!id || !district_name) {
      // 필요한 값이 없으면 리스트 페이지로 리디렉션
      router.push(`/districts/list?district_name=${district_name || ''}`)
    }
  }, [id, district_name])

  const handleGoBack = () => {
    router.push(`/districts/list?district_name=${district_name}`)
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        게시물이 삭제되었습니다.
      </Typography>
      <Typography variant="body1" gutterBottom>
        게시물 ID: {id}
      </Typography>
      <Typography variant="body1" gutterBottom>
        구 이름: {district_name}
      </Typography>
      <Button variant="contained" onClick={handleGoBack} sx={{ backgroundColor: '#304D30' }}>
        목록으로 돌아가기
      </Button>
    </Box>
  )
}
