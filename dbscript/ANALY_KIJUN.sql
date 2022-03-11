drop table analy_kijun;

CREATE TABLE analy_kijun (
    nendo        integer not null,
    kijun_cd     character varying(60),
    kijun_nm     character varying(60),
    kijun_val    decimal,
    average_val  decimal,
    max_val      decimal,
    min_val      decimal,
    center_val   decimal,
    mode_val     decimal
);


ALTER TABLE ONLY analy_kijun
    ADD CONSTRAINT analy_kijun_prkey PRIMARY KEY (
       nendo        ,
       kijun_cd 
    );



delete from analy_kijun;



insert into analy_kijun
select
    nendo,
    'keijo_shusi_hiritu',
    'Œoíûx”ä—¦',
    sum(keijo_shusi_hiritu) / count(1),
    sum(keijo_shusi_hiritu) / count(1),
    max(keijo_shusi_hiritu) ,
    min(keijo_shusi_hiritu) ,
    null
from
    v_analy_shuekisei_a
group by
    nendo
;



insert into analy_kijun
select
    nendo,
    'jikosihon_riekiritu',
    '©ŒÈ‘–{—˜‰v—¦',
    sum(roe) / count(1),
    sum(roe) / count(1),
    max(roe),
    min(roe),
    null
from
    V_ANALY_RETURN_ON_EQUITY_A
group by
    nendo
;



insert into analy_kijun
select
    nendo,
    'sousisan_riekiritu',
    '‘‘Y—˜‰v—¦',
    sum(roa) / count(1),
    sum(roa) / count(1),
    max(roa),
    min(roa),
    null
from
    V_ANALY_RETURN_ON_EQUITY_A
group by
    nendo
;



insert into analy_kijun
select
    nendo,
    'ryudo_hiritu',
    '—¬“®”ä—¦',
    sum(ryudo_hiritu) / count(1),
    sum(ryudo_hiritu) / count(1),
    max(ryudo_hiritu),
    min(ryudo_hiritu),
    null
from
    V_ANALY_RYUDO_ANZENSEI_A
group by
    nendo
;



insert into analy_kijun
select
    nendo,
    'jikosihon_hiritu',
    '©ŒÈ‘–{”ä—¦',
    sum(sihon_hiritu) / count(1),
    sum(sihon_hiritu) / count(1),
    max(sihon_hiritu),
    min(sihon_hiritu),
    null
from
    V_ANALY_RETURN_ON_EQUITY_A
group by
    nendo
;




insert into analy_kijun
select
    nendo,
    'kotei_hiritu',
    'ŒÅ’è”ä—¦',
    sum(kotei_hiritu) / count(1),
    sum(kotei_hiritu) / count(1),
    max(kotei_hiritu),
    min(kotei_hiritu),
    null
from
    V_ANALY_KOTEI_HIRITU_A
group by
    nendo
;


insert into analy_kijun
select
    nendo,
    'kotei_shoukyakuritu',
    '—LŒ`ŒÅ’è‘Y‹p—¦',
    sum(shokyaku_hiritu) / count(1),
    sum(shokyaku_hiritu) / count(1),
    max(shokyaku_hiritu),
    min(shokyaku_hiritu),
    null
from
    V_ANALY_KOTEI_SHOKYAKURITU_A
group by
    nendo
;




insert into analy_kijun
select
    nendo,
    'jugyoin_hitori_rieki',
    ']‹Æˆõˆêl“–‚½‚è—˜‰v',
    sum(hitori_rieki) / count(1),
    sum(hitori_rieki) / count(1),
    max(hitori_rieki),
    min(hitori_rieki),
    null
from
    V_ANALY_JUGYOIN_HITORI_RIEKI_A
group by
    nendo
;



insert into analy_kijun
select
    nendo,
    'keijo_rieki_seichoritu',
    'Œoí—˜‰v¬’·—¦',
    sum(seicho_ritu) / count(1),
    sum(seicho_ritu) / count(1),
    max(seicho_ritu),
    min(seicho_ritu),
    null
from
    V_ANALY_KEIJORIEKI_SEICHORITU_A
group by
    nendo
;



insert into analy_kijun
select
    nendo,
    'sihon_seichoritu',
    '‘–{¬’·—¦',
    sum(seicho_ritu) / count(1),
    sum(seicho_ritu) / count(1),
    max(seicho_ritu),
    min(seicho_ritu),
    null
from
    V_ANALY_SIHON_SEICHORITU_A
group by
    nendo
;





