CREATE TABLE analy_gyoretu (
    nendo        integer not null,
    hyo_num      integer not null,
    hyo_num_sub  integer ,
    gyo_num      integer not null,
    gyo_num_sub  integer ,
    retu_num     integer not null,
    retu_num_sub integer ,
    indent       integer ,
    name1         character varying(100),
    name2         character varying(100),
    name3         character varying(100),
    name4         character varying(100),
    name5         character varying(100)
);


ALTER TABLE ONLY analy_gyoretu
    ADD CONSTRAINT analy_gyoretu_prkey PRIMARY KEY (
       nendo        ,
       hyo_num      ,
       gyo_num      ,
       retu_num     ,
       retu_num_sub 
    );

    
    