const axios = req('axios');

const fetchData = async () => {
  const url = 'https://apis.data.go.kr/1613000/ExpBusInfoService/getExpBusTrminlList?serviceKey=%2BZv9hPmS6mOwrU8rWvnNbtY3fQm2aGk6SK4q3NcBQ9hmatKRNc50lC%2Fm5gAb0wOv5V71nzLUz1CASUqsYmYK8g%3D%3D&numOfRows=300&pageNo=1&_type=json';

  try {
    const response = await axios.get(url);
    console.log('Status', response.status, response.statusText);
    console.log('Header', response.headers);
    console.log('Data', response.data);
  } catch (error) {
    console.error(error);
  }
};

fetchData();
