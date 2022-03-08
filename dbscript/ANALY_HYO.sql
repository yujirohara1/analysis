


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

    



insert into analy_hyo values(2020, 20, 0, trim('���v�v�Z��                             '),null,null,null);
insert into analy_hyo values(2020, 21, 0, trim('��p�\���\                             '),null,null,null);
insert into analy_hyo values(2020, 22, 0, trim('�ݎؑΏƕ\                             '),null,null,null);
insert into analy_hyo values(2020, 23, 0, trim('���{�I���x�Ɋւ��钲                   '),null,null,null);
insert into analy_hyo values(2020, 24, 0, trim('��ƍɊւ��钲                       '),null,null,null);
insert into analy_hyo values(2020, 25, 0, trim('�E��ʋ��^�Ɋւ��钲                   '),null,null,null);
insert into analy_hyo values(2020, 27, 0, trim('�o�c���͂Ɋւ��钲�i��j               '),null,null,null);
insert into analy_hyo values(2020, 28, 0, trim('�o�c���͂Ɋւ��钲�i��j               '),null,null,null);
insert into analy_hyo values(2020, 30, 0, trim('�{�݋y�ыƖ��T���Ɋւ��钲�i�t�\�j     '),null,null,null);
insert into analy_hyo values(2020, 31, 0, trim('�o�c���͂Ɋւ��钲�i�O�j               '),null,null,null);
insert into analy_hyo values(2020, 32, 0, trim('�o�c���͂Ɋւ��钲�i��j               '),null,null,null);
insert into analy_hyo values(2020, 33, 0, trim('�o�c���͂Ɋւ��钲�i��j               '),null,null,null);
insert into analy_hyo values(2020, 34, 0, trim('�{�݋y�ыƖ��T���Ɋւ��钲�i�t�\�j     '),null,null,null);
insert into analy_hyo values(2020, 40, 0, trim('�J�����Ɋւ��钲                       '),null,null,null);
insert into analy_hyo values(2020, 45, 0, trim('��ƍN�x�ʏ��ҏ󋵒�                 '),null,null,null);
-- insert into analy_hyo values(2020, 45, 0, trim('��ƍN�x�ʏ��ҏ󋵒�                 '),null,null,null);
insert into analy_hyo values(2020, 50, 0, trim('�{�݋y�ыƖ��T���Ɋւ��钲             '),null,null,null);
insert into analy_hyo values(2020, 51, 0, trim('�{�݋y�ыƖ��T���Ɋւ��钲             '),null,null,null);
insert into analy_hyo values(2020, 52, 0, trim('���̑�                                 '),null,null,null);
insert into analy_hyo values(2020, 60, 0, trim('�{�݋y�ыƖ��T���Ɋւ��钲             '),null,null,null);

commit;
