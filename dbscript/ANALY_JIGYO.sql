drop table analy_jigyo;

CREATE TABLE analy_jigyo (
    nendo        integer not null,
    gyoshu_cd    character varying(10),
    gyoshu_nm    character varying(60),
    jigyo_cd    character varying(10),
    jigyo_nm    character varying(60),
    memo1       character varying(60),
    memo2       character varying(60),
    memo3       character varying(60)
);


ALTER TABLE ONLY analy_jigyo
    ADD CONSTRAINT analy_jigyo_prkey PRIMARY KEY (
       nendo        ,
       gyoshu_cd      ,
       jigyo_cd 
    );

    



insert into analy_jigyo values(2020,'01','����',       '0','�㐅��',null,null,null);
insert into analy_jigyo values(2020,'01','����',       '1','�ȈՐ���',null,null,null);
insert into analy_jigyo values(2020,'02','����',       '2','�H�Ɨp����',null,null,null);
insert into analy_jigyo values(2020,'03','���',       '1','�H�ʓd��',null,null,null);
insert into analy_jigyo values(2020,'03','���',       '3','�����ԉ^��',null,null,null);
insert into analy_jigyo values(2020,'03','���',       '5','�s�s�����S��',null,null,null);
insert into analy_jigyo values(2020,'03','���',       '6','�����d�ԓ�',null,null,null);
insert into analy_jigyo values(2020,'03','���',       '7','�D���^�q',null,null,null);
insert into analy_jigyo values(2020,'04','�d�C',       '0','�d�C',null,null,null);
insert into analy_jigyo values(2020,'05','�K�X',       '0','�K�X',null,null,null);
insert into analy_jigyo values(2020,'06','�a�@',       '0','�a�@',null,null,null);
insert into analy_jigyo values(2020,'17','������1',    '1','����������',null,null,null);
insert into analy_jigyo values(2020,'17','������1',    '2','�������������',null,null,null);
insert into analy_jigyo values(2020,'17','������1',    '3','���扺����',null,null,null);
insert into analy_jigyo values(2020,'17','������1',    '4','�����������',null,null,null);
insert into analy_jigyo values(2020,'17','������1',    '5','�_�ƏW���r���{��',null,null,null);
insert into analy_jigyo values(2020,'17','������1',    '6','���ƏW��r���{��',null,null,null);
insert into analy_jigyo values(2020,'17','������1',    '7','�ыƏW���r���{��',null,null,null);
insert into analy_jigyo values(2020,'17','������1',    '8','�ȈՔr���{��',null,null,null);
insert into analy_jigyo values(2020,'17','������1',    '9','���K�͔r�������{��',null,null,null);
insert into analy_jigyo values(2020,'18','������2',    '0','����r�������{��',null,null,null);
insert into analy_jigyo values(2020,'18','������2',    '1','�ʔr�������{��',null,null,null);
insert into analy_jigyo values(2020,'08','�`�p',       '0','�`�p',null,null,null);
insert into analy_jigyo values(2020,'09','�s��',       '0','�s��',null,null,null);
insert into analy_jigyo values(2020,'10','�ƒ{��',     '0','�ƒ{��',null,null,null);
insert into analy_jigyo values(2020,'11','�ό�',       '1','�x�{�h��',null,null,null);
insert into analy_jigyo values(2020,'11','�ό�',       '2','����',null,null,null);
insert into analy_jigyo values(2020,'11','�ό�',       '3','���̑��ό�',null,null,null);
insert into analy_jigyo values(2020,'12','�',       '1','�ՊC�y�n����',null,null,null);
insert into analy_jigyo values(2020,'12','�',       '2','���̑�����',null,null,null);
insert into analy_jigyo values(2020,'13','���H',       '0','�L�����H',null,null,null);
insert into analy_jigyo values(2020,'14','���ԏ�',     '0','���ԏ�',null,null,null);
insert into analy_jigyo values(2020,'15','���̑�',     '0','���̑�',null,null,null);
insert into analy_jigyo values(2020,'16','���',       '0','���T�[�r�X',null,null,null);

commit;
