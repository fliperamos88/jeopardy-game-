import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Head = () => {
  const headArr: string[] = [
    'head1',
    'head2',
    'head3',
    'head4',
    'head5',
    'head6',
  ];

  // const getCategory = async () => {
  //   const {
  //     data: { data },
  //   } = await axios.get('http://localhost:3001/category', {
  //     params: { offset: Math.floor(Math.random() * 2000), limit: 20 },
  //   });

  //   let categoryArr = data.filter((value: any) => {
  //     return value.clue_count >= 4;
  //   });
  //   let top6 = categoryArr.slice(0, 6).map((item: any) => item.category);
  //   setHeader(top6);
  // };

  // console.log(header);
  // useEffect(() => {
  //   getCategory();
  // }, []);

  return (
    <>
      {headArr.map((head: any) => {
        return <th key={uuidv4()}>{head}</th>;
      })}
    </>
  );
};

export default Head;
