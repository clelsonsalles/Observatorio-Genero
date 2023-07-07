package org.iadb.seppir.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.olap4j.metadata.Cube;
import org.olap4j.metadata.Dimension;
import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Measure;
import org.olap4j.metadata.Member;
import org.olap4j.metadata.NamedSet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;



/**
 * Servlet implementation 
 * 
 * 
 * @author Cesar Oliveira
 * 			cesar.lins@gmail.com
 * 
 * Inter-American Development Bank, 2013
 * 
 */
@WebServlet({ "/CubeNavigatorServlet", "/cubos" })
public class CubeNavigatorServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private OlapCurrentService olap = null;
	
	private Gson gson = new GsonBuilder()
	   .setDateFormat("dd/MM/yyyy HH:mm:ss").create();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CubeNavigatorServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    
    
	@Override
	public void init() throws ServletException {
		
		//Get host address: this.getServletContext().g
		
		olap = OlapCurrentService.getInstance();
		try {
			
			olap.init();
			
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}



	@Override
	public void destroy() {

		if (olap != null)
			try {
				olap.closeConnection();
				System.out.println("OLAP Disconnected.");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}



	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		/*
		 * IMPORTANT: conf/server.xml - the Connector MUST have the following attribute 
		 * 		URIEncoding="UTF-8"
		 */
		
				
		
		String flush = request.getParameter("flush");		
		String wantMetadata = request.getParameter("metadata");
		
		String status = null;
		
		/*if ("true".equals(flush))
			try {
				
				//this.olap.flushSchemaCache();
				
				status = "Cubos atualizados.";
				
			} catch (SQLException e1) {

				System.err.println("Could not flush schema: " + e1.getMessage());
				
				status = e1.getCause().toString() + " - " + e1.getMessage();
			}*/
			
		
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache,no-store,max-age=0");
		response.setDateHeader("Expires", 1);
		
		
		List<String> cubeList = this.olap.listCubeNames();
			
		
		if ("true".equals(wantMetadata))
		{
					//retrieve metadata
					Map<String, Object>[] cdataArray = new Map[cubeList.size()];
					
					for (int i = 0; i < cubeList.size(); i++)
					{
						Map<String, Object> cm = DBService.getInstance().getCubeMetadata(cubeList.get(i));
						cdataArray[i] = cm;
					}
					
					out.print(gson.toJson(cdataArray));
		}
		else
		{
			String separator = "";
			out.print("[");
			for (String c : cubeList)
			{
				out.println(separator + "{\"nome\": \"" + c + "\" }, ");
								
				separator = ", ";
			}
			out.print("]");
		}
			
		out.close();
		    
		
			
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
		
	}

}
