package org.iadb.seppir.admin;
/**
 * 
 */


import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.google.gson.Gson;

/**
 * 
 * @author Cesar Oliveira
 * 			cesar.lins@gmail.com
 * 
 * Inter-American Development Bank, 2013
 *
 */
public class DBService {
	
	
	
	private Connection sqlConnection;
	
	private String username = "";
	private String password = "";
	

	
	private String databaseURL; // = "jdbc:postgresql://localhost:5432/seppir";	
	
	private Gson gson = new Gson();
	
	private static DBService instance;
	
	public DBService()
	{
	}
	
	public static DBService getInstance()
	{
		if (instance == null) instance = new DBService();
		return instance;
	}
	

	public void init() throws SQLException, ClassNotFoundException
	{
		//if its already connected, do nothing
		if (sqlConnection != null) return;
		
		Properties prop = new Properties();
		try {
	            //load a properties file
			String propLocation = System.getProperty("catalina.base") + "/conf/olap.properties";
			System.out.println(propLocation);
			FileInputStream inStream = new FileInputStream(propLocation);
	 		prop.load(inStream);
	
	            //get the property value and print it out
	 		System.out.println("Configurações do banco:");
	         System.out.println("- Driver: " + prop.getProperty("databaseDriver"));
	 		System.out.println("- URL: " + prop.getProperty("databaseUrl"));
	 		
	 		inStream.close();
	
	 	} catch (IOException ex) {
	 		ex.printStackTrace();
	     }
		
		this.databaseURL = prop.getProperty("databaseUrl");
		
		this.username = prop.getProperty("databaseUser");
		this.password = prop.getProperty("databasePassword");
		
		String databaseDriver = prop.getProperty("databaseDriver");
		
		
				
		//Additional non-OLAP connection for simple queries
		this.sqlConnection = DriverManager.getConnection(databaseURL,
											        username,
											        password);
		
		
	}
	
	
	
	
	public void closeConnection() throws SQLException
	{
		
		if (sqlConnection != null && !sqlConnection.isClosed())
			this.sqlConnection.close();
	}
	
	
	
	
	
	public String convertToJson(ResultSet result) throws SQLException {

		StringBuffer json = new StringBuffer("{ ");
		String data = null;
		String fields = null;
		
		if (result != null)
		{
		
			ResultSetMetaData rsmd = result.getMetaData();
			
			int numColumns = rsmd.getColumnCount();
			
			String[] fieldNames = new String[numColumns];
			
			for (int colNum = 1; colNum <= numColumns; colNum++)
	    	{
	    		fieldNames[colNum - 1] = rsmd.getColumnName(colNum);	    		
	    	}
	    	    	
			List<Object[]> rowArrays = new ArrayList<>();
						
			while(result.next())
			{
				Object[] valuesRow = new Object[numColumns];
				
				for (int i = 0; i < numColumns; i++)
		    	{
		    		valuesRow[i] = result.getObject(fieldNames[i]);
		    	}
				
				rowArrays.add(valuesRow);
				
			}
			
			result.close();
			
			//all results in hands, lets convert it to json
			data = gson.toJson(rowArrays);
			fields = gson.toJson(fieldNames);
		}
		
		json.append("\"data\": ");
		json.append(data);
		json.append(", \"fields\": ");
		json.append(fields);
		json.append(" }");
		
		return json.toString();
	}

	
	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}
	
	/*
	private String barNotation(Member member)
	{
		return member.getDimension().getCaption() + "|" + member.getCaption();
	}*/
	
	
	
	
	
	/**
	 * Constructs and executes a sql select statement as follows
	 * select <b>fields<b> from <b>table</b>
	 * where field[0]=fieldValues[0] and ... and field[n]=fieldValues[n];
	 * Omitting null field values from the where clause.
	 * 
	 * Please, insert quotation marks ('') in field values when needed.
	 * This method will not insert them by itself.
	 *  
	 * @param table
	 * @param fields
	 * @param fieldValues
	 * @param groupByFields - if fields have aggregate functions, add the groupBy fields
	 * @return
	 * @throws SQLException 
	 */
	public ResultSet getRows(String table, String[] fields, String[] fieldValues, String[] groupByFields) throws SQLException
	{
		ResultSet r = null;
		
		//SELECT
		StringBuffer sb = new StringBuffer("select ");
		
		String separator = "";
		for (String f : fields)
		{
			sb.append(separator + f);
			separator = ",";
		}
		//FROM
		sb.append(" from ");
		sb.append(table);
		
		//WHERE
		sb.append(" where ");		
		
		separator = "";
		for (int i=0; i < fieldValues.length; i++)
		{
			String v = fieldValues[i];
			if (v != null && !"null".equals(v)) //the string null without quotes is considered null value
			{				
				sb.append(separator);
				sb.append(fields[i]);
				sb.append("=");
				sb.append(v);
				
				separator = " and ";
			}
				
		}
		
		//GROUP BY
		if (groupByFields != null && groupByFields.length > 0)
		{
			sb.append(" group by ");
			separator = "";
			for (String f : groupByFields)
			{
				sb.append(separator + f);
				separator = ",";
			}
		}
		
		//END
		sb.append(";");
		
		//System.out.println(sb.toString());
		
		if (this.sqlConnection != null)
		{
			Statement stmt = this.sqlConnection.createStatement();
			stmt.execute(sb.toString());
			
			r = stmt.getResultSet();
		}
		else
		{
			System.err.println("SQL is not connected. Initializing the server...");
			/*this.sqlConnection = DriverManager.getConnection(databaseURL,
			        username,
			        password);*/
			try {
				this.init();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				System.err.println("Impossible to connect to " + databaseURL);
				return null;
			}
			
			if (this.sqlConnection == null)
				System.err.println("Impossible to connect to " + databaseURL);
			else
			{
				Statement stmt = this.sqlConnection.createStatement();
				stmt.execute(sb.toString());
				
				r = stmt.getResultSet();
			}
			
		}
		return r;
	}

	public ResultSet execute(String sql) throws SQLException {
		
		if (this.sqlConnection != null)
		{
			Statement stmt = this.sqlConnection.createStatement();
			stmt.execute(sql);
			
			return stmt.getResultSet();
		}
		return null;
		
	}
	
	
	public Map<String, Object> getCubeMetadata(String cubeName) {
		
		Map<String, Object> r = this.getDatabaseData("tbl_config_cubos", 
				new String[] { "nome", "orgao", "contato", "periodicidade", "responsavel", "setor_responsavel",
							"proxima_atualizacao", "extraida_em",
							"cod_mes_atual", "ano_atual", "cod_mes_proximo", "ano_proximo", "bool_atualizacao_liberada" },
				new String[] { "'"+ cubeName +"'", null, null, null, null, null, null, null, null, null, null, null, null },
				null);
		
		if (r == null || r.isEmpty())
		{
			r = new HashMap<>();
			r.put("nome", cubeName);
		}
		
		return r;
	}
	/**
	 * This is intended for queries that return a single row.
	 * The row is returned as a field/value map.
	 * 
	 * @param table
	 * @param fields
	 * @param values
	 * @return
	 */
	public Map<String, Object> getDatabaseData(String table, String[] fields, String[] values, String[] groupBy)
	{
		HashMap<String, Object> data = new HashMap<>();
		
		try {
						
			ResultSet result = this.getRows(table, fields, values, groupBy);
			
			//fill in the hashmap with the first row only
			if (result != null && result.isBeforeFirst())
			{
				//get the first row							
				result.next();
				
				ResultSetMetaData rsmd = result.getMetaData();
				
				int numColumns = rsmd.getColumnCount();
								
				for (int colNum = 1; colNum <= numColumns; colNum++)
		    	{
		    		String field = rsmd.getColumnName(colNum);
		    		Object value = result.getObject(field);
		    		
		    		data.put(field, value);
		    	}
		    	    
				
				result.close();
				
			}
			else return null;
			
		} catch (SQLException e) {

			e.printStackTrace();
			return data;
		}
		
		return data;
	}
	
}
