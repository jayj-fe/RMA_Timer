// @ts-nocheck
import { useState, useEffect } from 'react';
import RmaSearchBar from '../components/RmaSearchBar'

const RmaHeader = () => {
  const [ filterShow, setFilterShow ] = useState(false);

  return (
    <section className='rma-header'>
      <article>
        <a href="https://docs.google.com/spreadsheets/d/10tZZFY0tDLhDHt0Asf8WuDfPCtTutsJX2HoKLSH-Phc/edit#gid=0" target='_blank'>데이터 업데이트하러가기</a>
        {/* <a href="#" target='_blank'>공휴일 입력하기</a> */}
        <button type='button' onClick={ (e) => setFilterShow(!filterShow) }>필터보기</button>
      </article>
      {
        filterShow && (
          <RmaSearchBar />
        )
      }
    </section>
  )
}
export default RmaHeader