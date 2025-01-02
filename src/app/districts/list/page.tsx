'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material'

export default function Districts() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const district_name = searchParams.get('district_name') || ''

  // 디버깅용 로그
  console.log('Search Params:', searchParams.toString())
  console.log('District Name:', district_name)

  const handleDetail = (id: number, district_name: string) => {
    const url = `/districts/${district_name}/detail?id=${id}&district_name=${district_name}`
    console.log('Navigating to:', url) // URL 로그 출력
    router.push(url)
  }

  return (
    <Box sx={{ padding: '100px' }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          {district_name || '알 수 없는 지역'}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '20%', textAlign: 'center' }}>분류</TableCell>
              <TableCell sx={{ width: '50%' }}>제목</TableCell>
              <TableCell sx={{ width: '15%', textAlign: 'center' }}>작성자</TableCell>
              <TableCell sx={{ width: '15%', textAlign: 'center' }}>시간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow onClick={() => handleDetail(1, `${district_name}`)} sx={{ cursor: 'pointer' }}>
              <TableCell sx={{ width: '20%', textAlign: 'center' }}>정책정보</TableCell>
              <TableCell sx={{ width: '50%' }}>{`${district_name}의 정책정보 입니다.`}</TableCell>
              <TableCell sx={{ width: '15%', textAlign: 'center' }}>관리자</TableCell>
              <TableCell sx={{ width: '15%', textAlign: 'center' }}>{new Date().toLocaleDateString()}</TableCell>
            </TableRow>
            <TableRow onClick={() => handleDetail(2, `${district_name}`)} sx={{ cursor: 'pointer' }}>
              <TableCell sx={{ width: '20%', textAlign: 'center' }}>대형폐기물 수수료</TableCell>
              <TableCell sx={{ width: '50%' }}>{`${district_name}의 대형폐기물 수수료 입니다.`}</TableCell>
              <TableCell sx={{ width: '15%', textAlign: 'center' }}>관리자</TableCell>
              <TableCell sx={{ width: '15%', textAlign: 'center' }}>{new Date().toLocaleDateString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Button
        variant="contained"
        sx={{
          display: 'flex',
          justifyItems: 'flex-end',
          backgroundColor: '#304D30',
          width: '80px',
          marginTop: '20px',
        }}
        onClick={() => router.push(`/districts/write?district_name=${district_name}`)}
      >
        추가
      </Button>
    </Box>
  )
}
