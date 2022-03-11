drop table analy_kijun;

CREATE TABLE analy_kijun (
    nendo        integer not null,
    gyomu_cd     character varying(10),
    gyoshu_cd    character varying(10),
    jigyo_cd     character varying(10),
    kijun_cd     character varying(60),
    kijun_nm     character varying(60),
    kijun_val    decimal,
    average_val  decimal,
    max_val      decimal,
    min_val      decimal,
    center_val   decimal,
    mode_val     decimal,
    hensa_val    decimal,
    bunsan_val   decimal
);


ALTER TABLE ONLY analy_kijun
    ADD CONSTRAINT analy_kijun_prkey PRIMARY KEY (
       nendo        ,
       gyomu_cd     ,
       gyoshu_cd    ,
       jigyo_cd     ,
       kijun_cd 
    );



delete from analy_kijun;



insert into analy_kijun
select
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     ,
    'keijo_shusi_hiritu',
    'åoèÌé˚éxî‰ó¶',
    sum(keijo_shusi_hiritu) / count(1),
    sum(keijo_shusi_hiritu) / count(1),
    max(keijo_shusi_hiritu) ,
    min(keijo_shusi_hiritu) ,
    null,
    null,
    stddev(keijo_shusi_hiritu),
    variance(keijo_shusi_hiritu)
from
    v_analy_shuekisei_a
group by
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     
;



insert into analy_kijun
select
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     ,
    'roe',
    'é©å»éëñ{óòâvó¶',
    sum(roe) / count(1),
    sum(roe) / count(1),
    max(roe),
    min(roe),
    null,
    null,
    stddev(roe),
    variance(roe)
from
    V_ANALY_RETURN_ON_EQUITY_A
group by
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     
;



insert into analy_kijun
select
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     ,
    'roa',
    'ëçéëéYóòâvó¶',
    sum(roa) / count(1),
    sum(roa) / count(1),
    max(roa),
    min(roa),
    null,
    null,
    stddev(roa),
    variance(roa)
from
    V_ANALY_RETURN_ON_EQUITY_A
group by
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     
;




insert into analy_kijun
select
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     ,
    'ryudo_hiritu',
    'ó¨ìÆî‰ó¶',
    sum(ryudo_hiritu) / count(1),
    sum(ryudo_hiritu) / count(1),
    max(ryudo_hiritu),
    min(ryudo_hiritu),
    null,
    null,
    stddev(ryudo_hiritu),
    variance(ryudo_hiritu)
from
    V_ANALY_RYUDO_ANZENSEI_A
group by
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     
;



insert into analy_kijun
select
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     ,
    'sihon_hiritu',
    'é©å»éëñ{î‰ó¶',
    sum(sihon_hiritu) / count(1),
    sum(sihon_hiritu) / count(1),
    max(sihon_hiritu),
    min(sihon_hiritu),
    null,
    null,
    stddev(sihon_hiritu),
    variance(sihon_hiritu)
from
    V_ANALY_RETURN_ON_EQUITY_A
group by
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     
;




insert into analy_kijun
select
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     ,
    'kotei_hiritu',
    'å≈íËî‰ó¶',
    sum(kotei_hiritu) / count(1),
    sum(kotei_hiritu) / count(1),
    max(kotei_hiritu),
    min(kotei_hiritu),
    null,
    null,
    stddev(kotei_hiritu),
    variance(kotei_hiritu)
from
    V_ANALY_KOTEI_HIRITU_A
group by
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     
;


insert into analy_kijun
select
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     ,
    'shokyaku_hiritu',
    'óLå`å≈íËéëéYèûãpó¶',
    sum(shokyaku_hiritu) / count(1),
    sum(shokyaku_hiritu) / count(1),
    max(shokyaku_hiritu),
    min(shokyaku_hiritu),
    null,
    null,
    stddev(shokyaku_hiritu),
    variance(shokyaku_hiritu)
from
    V_ANALY_KOTEI_SHOKYAKURITU_A
group by
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     
;




insert into analy_kijun
select
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     ,
    'hitori_rieki',
    'è]ã∆àıàÍêlìñÇΩÇËóòâv',
    sum(hitori_rieki) / count(1),
    sum(hitori_rieki) / count(1),
    max(hitori_rieki),
    min(hitori_rieki),
    null,
    null,
    stddev(hitori_rieki),
    variance(hitori_rieki)
from
    V_ANALY_JUGYOIN_HITORI_RIEKI_A
group by
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     
;



insert into analy_kijun
select
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     ,
    'keijorieki_seicho_ritu',
    'åoèÌóòâvê¨í∑ó¶',
    sum(seicho_ritu) / count(1),
    sum(seicho_ritu) / count(1),
    max(seicho_ritu),
    min(seicho_ritu),
    null,
    null,
    stddev(seicho_ritu),
    variance(seicho_ritu)
from
    V_ANALY_KEIJORIEKI_SEICHORITU_A
group by
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     
;



insert into analy_kijun
select
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     ,
    'sihon_seicho_ritu',
    'éëñ{ê¨í∑ó¶',
    sum(seicho_ritu) / count(1),
    sum(seicho_ritu) / count(1),
    max(seicho_ritu),
    min(seicho_ritu),
    null,
    null,
    stddev(seicho_ritu),
    variance(seicho_ritu)
from
    V_ANALY_SIHON_SEICHORITU_A
group by
    nendo        ,
    gyomu_cd     ,
    gyoshu_cd    ,
    jigyo_cd     
;




