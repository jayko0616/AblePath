package server.get_data;

import java.util.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.net.MalformedURLException;
import java.net.URL;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

class PlaceElevator{
    String baseURL;
    String serviceKey, pageNo, numOfRows, type;
    URL url;
    StringBuilder strBuilder;
    HttpURLConnection con;
    InputStream inputStream;
    
    PlaceElevator(){
        baseURL = "http://safemap.go.kr/openApiService/data/getPblfcltElvtrChckSttusData.do"; 
        serviceKey = "OA4F9U8I-OA4F-OA4F-OA4F-OA4F9U8IQT"; // 행정안전부에서 발급받은 api key 
        pageNo = "1"; 
        numOfRows = "10";
        type = "JSON";
    }
    
    /**
     * URL을 구성하는 함수
     */
    public void mkURL() {
	   strBuilder = new StringBuilder(baseURL);
	   
	   try {
           strBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + URLEncoder.encode(serviceKey, "UTF-8"));
           strBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
           strBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode(numOfRows, "UTF-8")); /*한 페이지 결과 수*/ 
           strBuilder.append("&" + URLEncoder.encode("type","UTF-8") + "=" + URLEncoder.encode(type, "UTF-8")); /*xml(기본값), JSON*/
       } catch (UnsupportedEncodingException e) {
           // TODO Auto-generated catch block
           e.printStackTrace();
       } 
	  
	   try{
           url = new URL(strBuilder.toString());
       } catch(MalformedURLException e) {
           e.printStackTrace();
       }
	   
   }
   /**
    * URL에 대해 데이터를 받아오는 함수
    * Redirection Error(302) 발생 시, 해당하는 URL로 새로 구성 후에
    * InputStream 객체에 데이터를 받아온다.
    */
   public void getInputStream(URL url) throws Exception {
	   int redirectedCount = 0;
	   
	   while (redirectedCount <= 1) {
		   con = (HttpURLConnection) url.openConnection();
		   
		   con.setConnectTimeout(10000);
		   con.setReadTimeout(0);
		   con.setUseCaches(false);
		   
		   con.setRequestMethod("GET");
		   
		   int resCode = con.getResponseCode();
		   
		   if(resCode == HttpURLConnection.HTTP_OK) {
			   inputStream = con.getInputStream();
		   }
		   
		   else if (resCode == HttpURLConnection.HTTP_MOVED_TEMP
				   || resCode == HttpURLConnection.HTTP_MOVED_PERM) {
			   //Redirected URL 받아오기
			   String redirectedUrl = con.getHeaderField("Location");
			   url = new URL(redirectedUrl);
		   }
		   else
			   throw new MalformedURLException("can not connect to the url");
		   
		   ++redirectedCount;
	   }
   }
   
   
    /***
     * 읽어온 데이터를 출력하는 함수
     * InputStream에 저장된 데이터를 라인 단위로 출력한다.
     */
    public void readData() throws Exception{
    	BufferedReader reader;
        String line;
        StringBuffer response;

        mkURL();
    	
    	try {
    	
    		getInputStream(url);
        	reader = new BufferedReader(new InputStreamReader(inputStream));
        	response = new StringBuffer();
        	
        	while((line = reader.readLine()) != null) {
        		System.out.println(line);
        		response.append(line);
        	}
        	
        	String jsonStr = response.toString();
        	JSONParser parser = new JSONParser();
        	JSONObject obj = null;
        	
        	try {
        		obj = (JSONObject)parser.parse(jsonStr);
        	} catch (Exception e) {
        		System.out.println("데이터 변환 실패 ");
        		e.printStackTrace();
        	}
        	
        	System.out.println(obj);
        	System.out.println(obj.get("BULD_NM"));

            reader.close(); // 연결 해제

    	} catch (IOException e) {
    		e.printStackTrace();
    	} 
    }
}

public class Elevator {
    public static void main(String[] args) throws Exception {
        PlaceElevator placeElevator = new PlaceElevator();
        placeElevator.readData();
    }
}