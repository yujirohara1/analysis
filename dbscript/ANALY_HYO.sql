


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

    



insert into analy_hyo values(2020, 20, 0, trim('‘¹‰vŒvZ‘                             '),null,null,null);
insert into analy_hyo values(2020, 21, 0, trim('”ï—p\¬•\                             '),null,null,null);
insert into analy_hyo values(2020, 22, 0, trim('‘İØ‘ÎÆ•\                             '),null,null,null);
insert into analy_hyo values(2020, 23, 0, trim('‘–{“Iûx‚ÉŠÖ‚·‚é’²                   '),null,null,null);
insert into analy_hyo values(2020, 24, 0, trim('Šé‹ÆÂ‚ÉŠÖ‚·‚é’²                       '),null,null,null);
insert into analy_hyo values(2020, 25, 0, trim('Eí•Ê‹‹—^‚ÉŠÖ‚·‚é’²                   '),null,null,null);
insert into analy_hyo values(2020, 27, 0, trim('Œo‰c•ªÍ‚ÉŠÖ‚·‚é’²iˆêj               '),null,null,null);
insert into analy_hyo values(2020, 28, 0, trim('Œo‰c•ªÍ‚ÉŠÖ‚·‚é’²i“ñj               '),null,null,null);
insert into analy_hyo values(2020, 30, 0, trim('{İ‹y‚Ñ‹Æ–±ŠT‹µ‚ÉŠÖ‚·‚é’²i•t•\j     '),null,null,null);
insert into analy_hyo values(2020, 31, 0, trim('Œo‰c•ªÍ‚ÉŠÖ‚·‚é’²iOj               '),null,null,null);
insert into analy_hyo values(2020, 32, 0, trim('Œo‰c•ªÍ‚ÉŠÖ‚·‚é’²iˆêj               '),null,null,null);
insert into analy_hyo values(2020, 33, 0, trim('Œo‰c•ªÍ‚ÉŠÖ‚·‚é’²i“ñj               '),null,null,null);
insert into analy_hyo values(2020, 34, 0, trim('{İ‹y‚Ñ‹Æ–±ŠT‹µ‚ÉŠÖ‚·‚é’²i•t•\j     '),null,null,null);
insert into analy_hyo values(2020, 40, 0, trim('ŒJ“ü‹à‚ÉŠÖ‚·‚é’²                       '),null,null,null);
insert into analy_hyo values(2020, 45, 0, trim('Šé‹ÆÂ”N“x•ÊŠÒó‹µ’²                 '),null,null,null);
insert into analy_hyo values(2020, 50, 0, trim('{İ‹y‚Ñ‹Æ–±ŠT‹µ‚ÉŠÖ‚·‚é’²             '),null,null,null);
insert into analy_hyo values(2020, 51, 0, trim('{İ‹y‚Ñ‹Æ–±ŠT‹µ‚ÉŠÖ‚·‚é’²             '),null,null,null);
insert into analy_hyo values(2020, 52, 0, trim('‚»‚Ì‘¼                                 '),null,null,null);
insert into analy_hyo values(2020, 60, 0, trim('{İ‹y‚Ñ‹Æ–±ŠT‹µ‚ÉŠÖ‚·‚é’²             '),null,null,null);

commit;

insert into analy_hyo
select
    b.nendo,
    a.hyo_num,
    a.hyo_num_sub,
    a.hyo_nm,
    a.memo1,
    a.memo2,
    a.memo3
from
    analy_hyo a,
    (select 2019 nendo union
     select 2018 nendo union
     select 2017 nendo ) b
;
