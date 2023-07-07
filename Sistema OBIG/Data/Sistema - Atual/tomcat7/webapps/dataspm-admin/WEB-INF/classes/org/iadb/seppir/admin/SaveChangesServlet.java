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
@WebServlet({ "/SaveChangesServlet", "/save" })
public class SaveChangesServlet extends HttpServlet {
	

	private static final long serialVersionUID = 1L;
       
	private DBService sqlService = null;
	
	private Gson gson = new Gson();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SaveChangesServlet() {
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
		
		String orgao = req.getParameter("orgao");
		String nome = req.getParameter("nome");
		String contato = req.getParameter("contato");
		String periodicidade = req.getParameter("periodicidade");
		int mesAtual = Integer.parseInt(req.getParameter("cod_mes_atual"));
		int anoAtual = Integer.parseInt(req.getParameter("ano_atual"));
		String responsavel = req.getParameter("responsavel");
		String setor_responsavel = req.getParameter("setor_responsavel");
		String proxima_atualizacao = req.getParameter("proxima_atualizacao");
		
		try {
			
			ResultSet r = sqlService.execute("update tbl_config_cubos set orgao='"+orgao+"',"
					+ " contato='"+ contato+"',"
					+ " periodicidade="+ periodicidade+","
					+ " cod_mes_atual="+ mesAtual +","
					+ " ano_atual="+ anoAtual +","
					+ " responsavel='"+ responsavel+"',"
					+ " setor_responsavel='"+ setor_responsavel+"',"
					+ " proxima_atualizacao='"+ proxima_atualizacao+"'"
					+ " where nome='"+nome+"';");
			
			System.out.println(r);
			
			response.setContentType("application/json");
		    PrintWriter out = response.getWriter();
		    out.println("[\"ok\"]");
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
