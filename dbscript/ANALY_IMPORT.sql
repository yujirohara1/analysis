drop table analy_import;

CREATE TABLE analy_import (
    nendo        integer not null,
    gyomu_cd     character varying(10),
    hyo_num      integer not null,
    hyo_num_sub  integer not null,
    file_url     character varying(60),
    status       integer not null,
    memo1        character varying(60),
    memo2        character varying(60),
    memo3        character varying(60)
);


ALTER TABLE ONLY analy_import
    ADD CONSTRAINT analy_import_prkey PRIMARY KEY (
      nendo       ,
      gyomu_cd    ,
      hyo_num     ,
      hyo_num_sub     
    );

    
