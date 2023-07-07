ALTER TABLE tbl_spm_disque100_crimes_current RENAME TO tbl_spm_disque180_crimes_current;
ALTER TABLE tbl_spm_disque100_ouvidoria_current RENAME TO tbl_spm_disque180_ouvidoria_current;
ALTER TABLE tbl_spm_disque100_telefonia_current RENAME TO tbl_spm_disque180_telefonia_current;
ALTER TABLE hist_spm_disque100_crimes_all RENAME TO hist_spm_disque180_crimes_all;
ALTER TABLE hist_spm_disque100_ouvidoria_all RENAME TO hist_spm_disque180_ouvidoria_all;
ALTER TABLE hist_spm_disque100_telefonia_all RENAME TO hist_spm_disque180_telefonia_all;

ALTER TABLE hist_tse_eleitorado_all alter COLUMN periodo type integer;

  
  CREATE OR REPLACE FUNCTION fx_ChartoBig(columnConvert character varying)
  RETURNS bigint AS
  $BODY$
  SELECT CASE WHEN trim($1) SIMILAR TO '[0-9]+'
        THEN CAST(trim($1) AS bigint)
    ELSE NULL END;
  $BODY$
  LANGUAGE 'sql' IMMUTABLE STRICT;
  
  ALTER TABLE tbl_mte_rais_current alter COLUMN cod_cbo type integer using fx_ChartoBig(cod_cbo);
ALTER TABLE tbl_mte_rais_current alter COLUMN cod_cnae2 type integer using cod_cnae2::integer;
ALTER TABLE tbl_mte_rais_current alter COLUMN cod_6_ibge_municipio_trabalho type integer using cod_6_ibge_municipio_trabalho::integer;
ALTER TABLE tbl_mte_rais_current alter COLUMN cod_6_ibge_municipio_estabelecimento type integer using cod_6_ibge_municipio_estabelecimento::integer;
  
  
  ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0001	type	bigint	using	fx_ChartoBig(v0001);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0002	type	bigint	using	fx_ChartoBig(v0002);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0011	type	bigint	using	fx_ChartoBig(v0011);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v1001	type	bigint	using	fx_ChartoBig(v1001);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v1002	type	bigint	using	fx_ChartoBig(v1002);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v1003	type	bigint	using	fx_ChartoBig(v1003);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v1004	type	bigint	using	fx_ChartoBig(v1004);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v2011	type	bigint	using	fx_ChartoBig(v2011);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0206	type	bigint	using	fx_ChartoBig(v0206);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0211	type	bigint	using	fx_ChartoBig(v0211);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0220	type	bigint	using	fx_ChartoBig(v0220);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0207	type	bigint	using	fx_ChartoBig(v0207);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0212	type	bigint	using	fx_ChartoBig(v0212);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0201	type	bigint	using	fx_ChartoBig(v0201);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0300	type	bigint	using	fx_ChartoBig(v0300);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v1006	type	bigint	using	fx_ChartoBig(v1006);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v4001	type	bigint	using	fx_ChartoBig(v4001);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v4002	type	bigint	using	fx_ChartoBig(v4002);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0202	type	bigint	using	fx_ChartoBig(v0202);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0203	type	bigint	using	fx_ChartoBig(v0203);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0204	type	bigint	using	fx_ChartoBig(v0204);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0205	type	bigint	using	fx_ChartoBig(v0205);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0208	type	bigint	using	fx_ChartoBig(v0208);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0209	type	bigint	using	fx_ChartoBig(v0209);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0210	type	bigint	using	fx_ChartoBig(v0210);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0213	type	bigint	using	fx_ChartoBig(v0213);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0214	type	bigint	using	fx_ChartoBig(v0214);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0215	type	bigint	using	fx_ChartoBig(v0215);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0216	type	bigint	using	fx_ChartoBig(v0216);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0217	type	bigint	using	fx_ChartoBig(v0217);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0218	type	bigint	using	fx_ChartoBig(v0218);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0219	type	bigint	using	fx_ChartoBig(v0219);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0221	type	bigint	using	fx_ChartoBig(v0221);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0222	type	bigint	using	fx_ChartoBig(v0222);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0301	type	bigint	using	fx_ChartoBig(v0301);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0401	type	bigint	using	fx_ChartoBig(v0401);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0402	type	bigint	using	fx_ChartoBig(v0402);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v0701	type	bigint	using	fx_ChartoBig(v0701);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v6529	type	bigint	using	fx_ChartoBig(v6529);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v6600	type	bigint	using	fx_ChartoBig(v6600);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v6210	type	bigint	using	fx_ChartoBig(v6210);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v1005	type	bigint	using	fx_ChartoBig(v1005);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v2012	type	bigint	using	fx_ChartoBig(v2012);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v6203	type	bigint	using	fx_ChartoBig(v6203);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v6204	type	bigint	using	fx_ChartoBig(v6204);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v6530	type	bigint	using	fx_ChartoBig(v6530);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v6531	type	bigint	using	fx_ChartoBig(v6531);
ALTER TABLE tbl_ibge_censo2010_amostra_domicilios Alter COLUMN	v6532	type	bigint	using	fx_ChartoBig(v6532);

ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0001	type	bigint	using	fx_ChartoBig(v0001);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0002	type	bigint	using	fx_ChartoBig(v0002);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0011	type	bigint	using	fx_ChartoBig(v0011);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0300	type	bigint	using	fx_ChartoBig(v0300);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v1001	type	bigint	using	fx_ChartoBig(v1001);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v1002	type	bigint	using	fx_ChartoBig(v1002);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v1003	type	bigint	using	fx_ChartoBig(v1003);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v1004	type	bigint	using	fx_ChartoBig(v1004);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v1006	type	bigint	using	fx_ChartoBig(v1006);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0502	type	bigint	using	fx_ChartoBig(v0502);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0504	type	bigint	using	fx_ChartoBig(v0504);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0601	type	bigint	using	fx_ChartoBig(v0601);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6033	type	bigint	using	fx_ChartoBig(v6033);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6036	type	bigint	using	fx_ChartoBig(v6036);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6037	type	bigint	using	fx_ChartoBig(v6037);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6040	type	bigint	using	fx_ChartoBig(v6040);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0606	type	bigint	using	fx_ChartoBig(v0606);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0613	type	bigint	using	fx_ChartoBig(v0613);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0614	type	bigint	using	fx_ChartoBig(v0614);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0615	type	bigint	using	fx_ChartoBig(v0615);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0616	type	bigint	using	fx_ChartoBig(v0616);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0617	type	bigint	using	fx_ChartoBig(v0617);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0618	type	bigint	using	fx_ChartoBig(v0618);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0619	type	bigint	using	fx_ChartoBig(v0619);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0620	type	bigint	using	fx_ChartoBig(v0620);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0621	type	bigint	using	fx_ChartoBig(v0621);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0622	type	bigint	using	fx_ChartoBig(v0622);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6222	type	bigint	using	fx_ChartoBig(v6222);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6224	type	bigint	using	fx_ChartoBig(v6224);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0623	type	bigint	using	fx_ChartoBig(v0623);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0624	type	bigint	using	fx_ChartoBig(v0624);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0625	type	bigint	using	fx_ChartoBig(v0625);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6252	type	bigint	using	fx_ChartoBig(v6252);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6254	type	bigint	using	fx_ChartoBig(v6254);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6256	type	bigint	using	fx_ChartoBig(v6256);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0626	type	bigint	using	fx_ChartoBig(v0626);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6262	type	bigint	using	fx_ChartoBig(v6262);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6264	type	bigint	using	fx_ChartoBig(v6264);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6266	type	bigint	using	fx_ChartoBig(v6266);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0627	type	bigint	using	fx_ChartoBig(v0627);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0628	type	bigint	using	fx_ChartoBig(v0628);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0629	type	bigint	using	fx_ChartoBig(v0629);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0630	type	bigint	using	fx_ChartoBig(v0630);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0631	type	bigint	using	fx_ChartoBig(v0631);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0632	type	bigint	using	fx_ChartoBig(v0632);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0633	type	bigint	using	fx_ChartoBig(v0633);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0634	type	bigint	using	fx_ChartoBig(v0634);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0635	type	bigint	using	fx_ChartoBig(v0635);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6400	type	bigint	using	fx_ChartoBig(v6400);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6352	type	bigint	using	fx_ChartoBig(v6352);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6354	type	bigint	using	fx_ChartoBig(v6354);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6356	type	bigint	using	fx_ChartoBig(v6356);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0636	type	bigint	using	fx_ChartoBig(v0636);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6362	type	bigint	using	fx_ChartoBig(v6362);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6364	type	bigint	using	fx_ChartoBig(v6364);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6366	type	bigint	using	fx_ChartoBig(v6366);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0637	type	bigint	using	fx_ChartoBig(v0637);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0638	type	bigint	using	fx_ChartoBig(v0638);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0639	type	bigint	using	fx_ChartoBig(v0639);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0640	type	bigint	using	fx_ChartoBig(v0640);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0641	type	bigint	using	fx_ChartoBig(v0641);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0642	type	bigint	using	fx_ChartoBig(v0642);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0643	type	bigint	using	fx_ChartoBig(v0643);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0644	type	bigint	using	fx_ChartoBig(v0644);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0645	type	bigint	using	fx_ChartoBig(v0645);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6461	type	bigint	using	fx_ChartoBig(v6461);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6471	type	bigint	using	fx_ChartoBig(v6471);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0648	type	bigint	using	fx_ChartoBig(v0648);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0649	type	bigint	using	fx_ChartoBig(v0649);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0650	type	bigint	using	fx_ChartoBig(v0650);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0651	type	bigint	using	fx_ChartoBig(v0651);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6511	type	bigint	using	fx_ChartoBig(v6511);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6513	type	bigint	using	fx_ChartoBig(v6513);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6514	type	bigint	using	fx_ChartoBig(v6514);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0652	type	bigint	using	fx_ChartoBig(v0652);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6521	type	bigint	using	fx_ChartoBig(v6521);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6524	type	bigint	using	fx_ChartoBig(v6524);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6525	type	bigint	using	fx_ChartoBig(v6525);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6526	type	bigint	using	fx_ChartoBig(v6526);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6527	type	bigint	using	fx_ChartoBig(v6527);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6528	type	bigint	using	fx_ChartoBig(v6528);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6529	type	bigint	using	fx_ChartoBig(v6529);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6530	type	bigint	using	fx_ChartoBig(v6530);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6531	type	bigint	using	fx_ChartoBig(v6531);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6532	type	bigint	using	fx_ChartoBig(v6532);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0653	type	bigint	using	fx_ChartoBig(v0653);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0654	type	bigint	using	fx_ChartoBig(v0654);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0655	type	bigint	using	fx_ChartoBig(v0655);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0656	type	bigint	using	fx_ChartoBig(v0656);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0657	type	bigint	using	fx_ChartoBig(v0657);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0658	type	bigint	using	fx_ChartoBig(v0658);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0659	type	bigint	using	fx_ChartoBig(v0659);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6591	type	bigint	using	fx_ChartoBig(v6591);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0660	type	bigint	using	fx_ChartoBig(v0660);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6602	type	bigint	using	fx_ChartoBig(v6602);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6604	type	bigint	using	fx_ChartoBig(v6604);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6606	type	bigint	using	fx_ChartoBig(v6606);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0661	type	bigint	using	fx_ChartoBig(v0661);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0662	type	bigint	using	fx_ChartoBig(v0662);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0663	type	bigint	using	fx_ChartoBig(v0663);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6631	type	bigint	using	fx_ChartoBig(v6631);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6632	type	bigint	using	fx_ChartoBig(v6632);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6633	type	bigint	using	fx_ChartoBig(v6633);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0664	type	bigint	using	fx_ChartoBig(v0664);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6641	type	bigint	using	fx_ChartoBig(v6641);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6642	type	bigint	using	fx_ChartoBig(v6642);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6643	type	bigint	using	fx_ChartoBig(v6643);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0665	type	bigint	using	fx_ChartoBig(v0665);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6660	type	bigint	using	fx_ChartoBig(v6660);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6664	type	bigint	using	fx_ChartoBig(v6664);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0667	type	bigint	using	fx_ChartoBig(v0667);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0668	type	bigint	using	fx_ChartoBig(v0668);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6681	type	bigint	using	fx_ChartoBig(v6681);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6682	type	bigint	using	fx_ChartoBig(v6682);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0669	type	bigint	using	fx_ChartoBig(v0669);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6691	type	bigint	using	fx_ChartoBig(v6691);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6692	type	bigint	using	fx_ChartoBig(v6692);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6693	type	bigint	using	fx_ChartoBig(v6693);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6800	type	bigint	using	fx_ChartoBig(v6800);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0670	type	bigint	using	fx_ChartoBig(v0670);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0671	type	bigint	using	fx_ChartoBig(v0671);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6900	type	bigint	using	fx_ChartoBig(v6900);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6910	type	bigint	using	fx_ChartoBig(v6910);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6920	type	bigint	using	fx_ChartoBig(v6920);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6930	type	bigint	using	fx_ChartoBig(v6930);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6940	type	bigint	using	fx_ChartoBig(v6940);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6121	type	bigint	using	fx_ChartoBig(v6121);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0604	type	bigint	using	fx_ChartoBig(v0604);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v0605	type	bigint	using	fx_ChartoBig(v0605);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5020	type	bigint	using	fx_ChartoBig(v5020);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5060	type	bigint	using	fx_ChartoBig(v5060);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5070	type	bigint	using	fx_ChartoBig(v5070);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5080	type	bigint	using	fx_ChartoBig(v5080);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6462	type	bigint	using	fx_ChartoBig(v6462);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v6472	type	bigint	using	fx_ChartoBig(v6472);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5110	type	bigint	using	fx_ChartoBig(v5110);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5120	type	bigint	using	fx_ChartoBig(v5120);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5030	type	bigint	using	fx_ChartoBig(v5030);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5040	type	bigint	using	fx_ChartoBig(v5040);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5090	type	bigint	using	fx_ChartoBig(v5090);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5100	type	bigint	using	fx_ChartoBig(v5100);
ALTER TABLE tbl_ibge_censo2010_amostra_pessoas COLUMN	v5130	type	bigint	using	fx_ChartoBig(v5130);

DROP FUNCTION fx_chartobig(character varying);

CREATE TABLE hist_mte_rais_all
(
  ano integer,
  cod_causa_afastamento_1 smallint,
  cod_causa_afastamento_2 smallint,
  cod_causa_afastamento_3 smallint,
  cod_motivo_desligamento smallint,
  cod_cbo integer,
  cod_cnae2 integer,
  cod_cnae95 character varying(5),
  bool_ativo31dez smallint,
  cod_faixa_etaria smallint,
  cod_faixa_hora_contrat smallint,
  cod_faixa_remun_dez smallint,
  cod_faixa_remun_media smallint,
  cod_faixa_tempo_emprego smallint,
  cod_escolaridade_apos2005 smallint,
  horas_contratuais_semana smallint,
  idade smallint,
  bool_cei_vinculado smallint,
  bool_optante_simples smallint,
  cod_mes_admissao smallint,
  cod_mes_desligamento smallint,
  cod_6_ibge_municipio_trabalho integer,
  cod_6_ibge_municipio_estabelecimento integer,
  cod_nacionalidade smallint,
  cod_natureza_juridica character varying(4),
  bool_portador_deficiencia smallint,
  dias_afastados_ano smallint,
  cod_racacor smallint,
  valor_remuneracao_dez_nominal integer,
  valor_remuneracao_dez_salarios_minimos integer,
  valor_remuneracao_media_nominal integer,
  valor_remuneracao_media_salarios_minimos integer,
  cod_cnae2_subclasse character varying(7),
  cod_sexo smallint,
  cod_tamanho_estabelecimento smallint,
  tempo_emprego_meses smallint,
  cod_tipo_admissao smallint,
  cod_tipo_estabelecimento smallint,
  cod_tipo_deficiencia smallint,
  cod_tipo_vinculo smallint,
  id bigserial NOT NULL
)
WITH (
  OIDS=FALSE
);
ALTER TABLE hist_mte_rais_all
  OWNER TO postgres;

  
  INSERT INTO hist_mte_rais_all(
            ano, cod_causa_afastamento_1, cod_causa_afastamento_2, cod_causa_afastamento_3, 
            cod_motivo_desligamento, cod_cbo, cod_cnae2, cod_cnae95, bool_ativo31dez, 
            cod_faixa_etaria, cod_faixa_hora_contrat, cod_faixa_remun_dez, 
            cod_faixa_remun_media, cod_faixa_tempo_emprego, cod_escolaridade_apos2005, 
            horas_contratuais_semana, idade, bool_cei_vinculado, bool_optante_simples, 
            cod_mes_admissao, cod_mes_desligamento, cod_6_ibge_municipio_trabalho, 
            cod_6_ibge_municipio_estabelecimento, cod_nacionalidade, cod_natureza_juridica, 
            bool_portador_deficiencia, dias_afastados_ano, cod_racacor, valor_remuneracao_dez_nominal, 
            valor_remuneracao_dez_salarios_minimos, valor_remuneracao_media_nominal, 
            valor_remuneracao_media_salarios_minimos, cod_cnae2_subclasse, 
            cod_sexo, cod_tamanho_estabelecimento, tempo_emprego_meses, cod_tipo_admissao, 
            cod_tipo_estabelecimento, cod_tipo_deficiencia, cod_tipo_vinculo, 
            id)
   SELECT 2012,cod_causa_afastamento_1, cod_causa_afastamento_2, cod_causa_afastamento_3, 
       cod_motivo_desligamento, cod_cbo, cod_cnae2, cod_cnae95, bool_ativo31dez, 
       cod_faixa_etaria, cod_faixa_hora_contrat, cod_faixa_remun_dez, 
       cod_faixa_remun_media, cod_faixa_tempo_emprego, cod_escolaridade_apos2005, 
       horas_contratuais_semana, idade, bool_cei_vinculado, bool_optante_simples, 
       cod_mes_admissao, cod_mes_desligamento, cod_6_ibge_municipio_trabalho, 
       cod_6_ibge_municipio_estabelecimento, cod_nacionalidade, cod_natureza_juridica, 
       bool_portador_deficiencia, dias_afastados_ano, cod_racacor, valor_remuneracao_dez_nominal, 
       valor_remuneracao_dez_salarios_minimos, valor_remuneracao_media_nominal, 
       valor_remuneracao_media_salarios_minimos, cod_cnae2_subclasse, 
       cod_sexo, cod_tamanho_estabelecimento, tempo_emprego_meses, cod_tipo_admissao, 
       cod_tipo_estabelecimento, cod_tipo_deficiencia, cod_tipo_vinculo, 
       id
  FROM tbl_mte_rais_current;
