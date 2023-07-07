/**
 * 
 */
package org.iadb.seppir.admin;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Stack;

import org.olap4j.Cell;
import org.olap4j.CellSet;
import org.olap4j.CellSetAxis;
import org.olap4j.OlapConnection;
import org.olap4j.OlapException;
import org.olap4j.Position;
import org.olap4j.metadata.Cube;
import org.olap4j.metadata.Dimension;
import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Measure;
import org.olap4j.metadata.Member;
import org.olap4j.metadata.NamedList;
import org.olap4j.metadata.NamedSet;

import com.google.gson.Gson;

/**
 * 
 * @author Cesar Oliveira
 * 			cesar.lins@gmail.com
 * 
 * Inter-American Development Bank, 2013
 *
 */
public class OlapCurrentService {
	
	
	private OlapConnection olapConnection;
	
	private Connection baseConnection;
	
	
	private String username = "";
	private String password = "";
	

	private String catalogURL;// = "file://D:/eclipse-kepler-j2ee/workspace-seppir/monitor-olap/WebContent/WEB-INF/seppir_catalog.xml";
	private String databaseURL; // = "jdbc:postgresql://localhost:5432/seppir";	
	
	
	
	private static OlapCurrentService instance;
	
	private OlapCurrentService()
	{
	}
	
	public static OlapCurrentService getInstance()
	{
		if (instance == null) instance = new OlapCurrentService();
		return instance;
	}
	

	public void init() throws SQLException, ClassNotFoundException
	{
		//if its already connected, do nothing
		if (olapConnection != null) return;
		
		Properties prop = new Properties();
		try {
	            //load a properties file
			String propLocation = System.getProperty("catalina.base") + "/conf/olap.properties";
			
			FileInputStream inStream = new FileInputStream(propLocation);
	 		prop.load(inStream);
		 		
	 		inStream.close();
	
	 	} catch (IOException ex) {
	 		ex.printStackTrace();
	     }
		
		this.catalogURL = prop.getProperty("saikuCurrentCatalog");
		if (this.catalogURL == null)
			this.catalogURL = System.getProperty("catalina.base") + "/webapps/saiku/WEB-INF/classes/spm/spm_catalog.xml";
		
		this.databaseURL = prop.getProperty("databaseUrl");		
		this.username = prop.getProperty("databaseUser");
		this.password = prop.getProperty("databasePassword");
		
		String databaseDriver = prop.getProperty("databaseDriver");
		
		
		Class.forName("mondrian.olap4j.MondrianOlap4jDriver");

		this.baseConnection =
		/* (OlapWrapper) DriverManager.getConnection("jdbc:xmla:"
				+ "Server=" + serverURL + "?Catalog=SECOMT",
				username, //  see mondrian/WEB-INF/datasources.xml 
				password);*/					
			 DriverManager.getConnection(
				        "jdbc:mondrian:Jdbc=" + databaseURL + ";"
				        + "JdbcDrivers=" + databaseDriver + ";"
				        + "Catalog=" + catalogURL + ";"
				        + "JdbcUser=" + username + ";JdbcPassword=" + password,
				        username,
				        password);
			
		olapConnection = baseConnection
				.unwrap(OlapConnection.class);
		
		if (olapConnection != null)
			System.out.println("OLAP connected.");
		else
			System.out.println("OLAP disconnected.");
		
	}
	

	public List<String> listCubeNames()
	{		
		List<String> cubeNames = new ArrayList<String>();
		
		NamedList<Cube> cubes;
		try {
			cubes = this.olapConnection.getOlapSchema().getCubes();
			
			for (int i = 0; i < cubes.size(); i++) {
				cubeNames.add(cubes.get(i).getName());
			}
			
		} catch (OlapException e) {
			
			e.printStackTrace();
			return null;
		}

		return cubeNames;
	}
	
	
	public List<Dimension> getDimensions(String cubeName)
	{
		
		
		
		NamedList<Cube> cubes;
		try {
			NamedList<Dimension> shared = this.olapConnection.getOlapSchema().getSharedDimensions();
			cubes = this.olapConnection.getOlapSchema().getCubes();
			
			for (int i = 0; i < cubes.size(); i++) {
				//if name matches
				if (cubeName.equalsIgnoreCase(cubes.get(i).getName()))
				{
					//get cubes dimensions
					NamedList<Dimension> dims = cubes.get(i).getDimensions();
					//add eventual shared dimensions
					if (shared != null)
						dims.addAll(shared);
					
					return dims;
				}
			}
			//has only shared dimensions
			return shared;
			
		} catch (OlapException e) {
			
			e.printStackTrace();
			return null;
		}
		
	}
	
	public List<Measure> getMeasures(String cubeName)
	{
	
		NamedList<Cube> cubes;
		try {
			cubes = this.olapConnection.getOlapSchema().getCubes();
			
			for (int i = 0; i < cubes.size(); i++) {
				//if name matches
				if (cubeName.equalsIgnoreCase(cubes.get(i).getName()))
				{
					//get cubes measures
					List<Measure> measures = cubes.get(i).getMeasures();					
					return measures;
				}
			}
			
		} catch (OlapException e) {
			
			e.printStackTrace();
			return null;
		}
		
		return null;
	}
	
	/**
	 * Get Cube by name ignoring case
	 * 
	 * @param cubeName
	 * @return null if cube information can not be retrieved
	 */
	public Cube getCube(String cubeName)
	{
		try {
			
			if (cubeName == null) return null;
			
			NamedList<Cube> cubes = this.olapConnection.getOlapSchema().getCubes();
			
			for (int i = 0; i < cubes.size(); i++) {
				//if name matches
				if (cubeName.equalsIgnoreCase(cubes.get(i).getName()))
				{
					return cubes.get(i);
				}
			}
			
		} catch (OlapException e) {
			
			e.printStackTrace();
			return null;
		}
		return null;
	}
	
	
	
	
	public void closeConnection() throws SQLException
	{
		if (olapConnection != null && !olapConnection.isClosed())
		this.olapConnection.close();
		
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
	
	
	
}
