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

class PlaceElevator{
    String baseURL;
    String serviceKey, pageNo, numOfRows, type;
    URL url;
    StringBuilder strBuilder;
    HttpURLConnection con;
    InputStream inputStream;
    
    PlaceElevator(){
        baseURL = "http://safemap.go.kr/openApiService/data/getPblfcltElvtrChckSttusData.do";
        serviceKey = "OA4F9U8I-OA4F-OA4F-OA4F-OA4F9U8IQT";
        pageNo = "1";
        numOfRows = "10";
        type = "JSON";
    }
    
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
   
   
    
    public void readData() throws Exception{
    	mkURL();
    	
    	try {
    		//InputStream inputStream = con.getInputStream();
    		getInputStream(url);
        	BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        	
        	
        	
        	while(true) {
        		String line = reader.readLine();
        		if(line == null) break;
        		else    System.out.println(line);
        	}
        	
        	reader.close();
        	
        	
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