CREATE TABLE analy_main (
    nendo        integer not null,
    gyomu_cd     character varying(10),
    gyoshu_cd    character varying(10),
    jigyo_cd     character varying(10),
    dantai_cd    character varying(10),
    dantai_nm    character varying(80),
    sisetu_cd    character varying(10),
    sisetu_nm    character varying(80),
    hyo_num      integer not null,
    hyo_num_sub  integer ,
    gyo_num      integer not null,
    gyo_num_sub  integer ,
    retu_num     integer not null,
    retu_num_sub integer ,
    joken_1      integer ,
    joken_2      integer ,
    joken_3      integer ,
    joken_4      integer ,
    joken_5      integer ,
    joken_6      integer ,
    joken_7      integer ,
    joken_8      integer ,
    joken_9      integer ,
    tani         character varying(40),
    val_num      decimal,
    val_char     character varying(40),
    val_bikoa    character varying(40),
    val_bikob    character varying(40),
    val_bikoc    character varying(40)
);


ALTER TABLE ONLY analy_main
    ADD CONSTRAINT analy_main_prkey PRIMARY KEY (
       nendo        ,
       gyomu_cd   ,
       gyoshu_cd  ,
       jigyo_cd   ,
       dantai_cd    ,
       sisetu_cd    ,
       hyo_num      ,
       gyo_num      ,
       retu_num     
    );

    

create index idx1_analy_main on analy_main (nendo, hyo_num, gyo_num, retu_num);
create index idx2_analy_main on analy_main (hyo_num, gyo_num, retu_num);
create index idx3_analy_main on analy_main (nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd);

-- create index idx3_analy_main on analy_main (nendo);

-- create index idx3_analy_main on analy_main (nendo, gyoshu_cd, jigyo_cd);

-- create index idx3_analy_main on analy_main (nendo, gyomu_cd, gyoshu_cd, jigyo_cd, dantai_cd, sisetu_cd, hyo_num, gyo_num, retu_num);

-- 
-- vacuum;
-- analyze;
-- vacuum;
-- analyze;
-- 
-- drop index idx1_analy_main;
-- drop index idx2_analy_main;
-- drop index idx3_analy_main;
-- drop index idx4_analy_main;
-- 
-- 
-- 
-- 
-- EXPLAIN SELECT * FROM V_ANALY_KOTEI_HIRITU_A;
EXPLAIN ANALYZE  SELECT * FROM V_ANALY_SHUEKISEI_A;
EXPLAIN ANALYZE  SELECT * FROM V_ANALY_SHUEKISEI_A;
EXPLAIN ANALYZE  SELECT * FROM V_ANALY_SHUEKISEI_A;
EXPLAIN ANALYZE  SELECT * FROM V_ANALY_SHUEKISEI_A;
EXPLAIN ANALYZE  SELECT * FROM V_ANALY_SHUEKISEI_A;
EXPLAIN ANALYZE  SELECT * FROM V_ANALY_SHUEKISEI_A;
EXPLAIN ANALYZE  SELECT * FROM V_ANALY_SHUEKISEI_A;
EXPLAIN ANALYZE  SELECT * FROM V_ANALY_SHUEKISEI_A;
