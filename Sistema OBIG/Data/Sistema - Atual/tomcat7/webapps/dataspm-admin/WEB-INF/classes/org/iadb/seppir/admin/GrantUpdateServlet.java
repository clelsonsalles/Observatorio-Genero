package org.iadb.seppir.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;



/**
 * 
 * Servlet implementation class DataProviderServlet
 * 
 * 
 * @author Cesar Oliveira
 * 			cesar.lins@gmail.com
 * 
 * Inter-American Development Bank, 2013
 * 
 * 
 */
@WebServlet({ "/GrantUpdateServlet", "/grant" })
public class GrantUpdateServlet extends HttpServlet {
	

	private static final long serialVersionUID = 1L;
       
	private DBService sqlService = null;
	
	private Gson gson = new Gson();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GrantUpdateServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    
    
	@Override
	public void init() throws ServletException {
		
		//Get host address: this.getServletContext().g
		
		sqlService = DBService.getInstance();
		try {
			
			sqlService.init();
			
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

		if (sqlService != null)
			try {
				sqlService.closeConnection();
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
		
		String respMsg = null;
		
		
		/*try {
			
			ResultSet r = sqlService.execute("update tbl_mds_cadunico_quilombola_familia set bool_rural = not bool_rural;");
			respMsg = sqlService.convertToJson(r);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		
		response.setContentType("text/html");
	    PrintWriter out = response.getWriter();
	    out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 " +
	                                        "Transitional//EN\">\n" +
	                "<HTML>\n" +
	                "<HEAD><TITLE>SEPPIR acesso a dados</TITLE></HEAD>\n" +
	                "<BODY>\n" +
	                "<H1>Acesso a Dados: SEPPIR/PR</H1>\n"
	                + "<p>Este módulo tem acesso restrito."
	                + "<p>SEPPIR/PR</p>"
	                + "</BODY></HTML>");
	}



	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		String nome = req.getParameter("nome");
		int mesIndex = Integer.parseInt(req.getParameter("mes"));
		int ano = Integer.parseInt(req.getParameter("ano"));
		
		
		try {
			
			ResultSet r = sqlService.execute("update tbl_config_cubos set cod_mes_proximo="+mesIndex
					+ ", ano_proximo="+ano
					+ ", bool_atualizacao_liberada=true"
					+ " where nome='"+nome+"';");
			
			System.out.println(r);
			
			response.setContentType("application/json");
		    PrintWriter out = response.getWriter();
		    
		    String mesStr = null;
		    if (mesIndex == 0) mesStr = ""; else mesStr = mesIndex+"/";
		    
		    out.println("[\"ok\", \""+ mesStr + ano + "\"]");
		    out.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			response.setContentType("application/json");
		    PrintWriter out = response.getWriter();
		    out.println("[\"fail\", \""+ e.getMessage().replaceAll("\"", "'").replaceAll("\n", " ") +"\"]");
		    out.close();
		}
	}

	



	

}
