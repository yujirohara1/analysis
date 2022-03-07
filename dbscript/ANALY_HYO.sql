


drop table analy_hyo;

CREATE TABLE analy_hyo (
    nendo       integer not null,
    hyo_num     integer not null,
    hyo_num_sub integer not null,
    hyo_nm      character varying(60),
    memo1       character varying(60),
    memo2       character varying(60),
    memo3       character varying(60)
);


ALTER TABLE ONLY analy_hyo
    ADD CONSTRAINT analy_hyo_prkey PRIMARY KEY (
       nendo        ,
       hyo_num      ,
       hyo_num_sub 
    );

    



insert into analy_hyo values(2020, 20, 0, trim('損益計算書                             '),null,null,null);
insert into analy_hyo values(2020, 21, 0, trim('費用構成表                             '),null,null,null);
insert into analy_hyo values(2020, 22, 0, trim('貸借対照表                             '),null,null,null);
insert into analy_hyo values(2020, 23, 0, trim('資本的収支に関する調                   '),null,null,null);
insert into analy_hyo values(2020, 24, 0, trim('企業債に関する調                       '),null,null,null);
insert into analy_hyo values(2020, 25, 0, trim('職種別給与に関する調                   '),null,null,null);
insert into analy_hyo values(2020, 27, 0, trim('経営分析に関する調（一）               '),null,null,null);
insert into analy_hyo values(2020, 28, 0, trim('経営分析に関する調（二）               '),null,null,null);
insert into analy_hyo values(2020, 30, 0, trim('施設及び業務概況に関する調（付表）     '),null,null,null);
insert into analy_hyo values(2020, 31, 0, trim('経営分析に関する調（三）               '),null,null,null);
insert into analy_hyo values(2020, 32, 0, trim('経営分析に関する調（一）               '),null,null,null);
insert into analy_hyo values(2020, 33, 0, trim('経営分析に関する調（二）               '),null,null,null);
insert into analy_hyo values(2020, 34, 0, trim('施設及び業務概況に関する調（付表）     '),null,null,null);
insert into analy_hyo values(2020, 40, 0, trim('繰入金に関する調                       '),null,null,null);
insert into analy_hyo values(2020, 45, 0, trim('企業債年度別償還状況調                 '),null,null,null);
-- insert into analy_hyo values(2020, 45, 0, trim('企業債年度別償還状況調                 '),null,null,null);
insert into analy_hyo values(2020, 50, 0, trim('施設及び業務概況に関する調             '),null,null,null);
insert into analy_hyo values(2020, 51, 0, trim('施設及び業務概況に関する調             '),null,null,null);
insert into analy_hyo values(2020, 52, 0, trim('その他                                 '),null,null,null);
insert into analy_hyo values(2020, 60, 0, trim('施設及び業務概況に関する調             '),null,null,null);

commit;
