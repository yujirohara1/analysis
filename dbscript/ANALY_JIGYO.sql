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

    

delete from analy_jigyo;


insert into analy_jigyo values(2020,'1','����',        '0','�㐅��',null,null,null);
insert into analy_jigyo values(2020,'1','����',        '1','�ȈՐ���',null,null,null);
insert into analy_jigyo values(2020,'2','����',        '2','�H�Ɨp����',null,null,null);
insert into analy_jigyo values(2020,'3','���',        '1','�H�ʓd��',null,null,null);
insert into analy_jigyo values(2020,'3','���',        '3','�����ԉ^��',null,null,null);
insert into analy_jigyo values(2020,'3','���',        '5','�s�s�����S��',null,null,null);
insert into analy_jigyo values(2020,'3','���',        '6','�����d�ԓ�',null,null,null);
insert into analy_jigyo values(2020,'3','���',        '7','�D���^�q',null,null,null);
insert into analy_jigyo values(2020,'4','�d�C',        '0','�d�C',null,null,null);
insert into analy_jigyo values(2020,'5','�K�X',        '0','�K�X',null,null,null);
insert into analy_jigyo values(2020,'6','�a�@',        '0','�a�@',null,null,null);
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
insert into analy_jigyo values(2020,'8','�`�p',        '0','�`�p',null,null,null);
insert into analy_jigyo values(2020,'9','�s��',        '0','�s��',null,null,null);
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



insert into analy_jigyo values(2019,'1','����',        '0','�㐅��',null,null,null);
insert into analy_jigyo values(2019,'1','����',        '1','�ȈՐ���',null,null,null);
insert into analy_jigyo values(2019,'2','����',        '2','�H�Ɨp����',null,null,null);
insert into analy_jigyo values(2019,'3','���',        '1','�H�ʓd��',null,null,null);
insert into analy_jigyo values(2019,'3','���',        '3','�����ԉ^��',null,null,null);
insert into analy_jigyo values(2019,'3','���',        '5','�s�s�����S��',null,null,null);
insert into analy_jigyo values(2019,'3','���',        '6','�����d�ԓ�',null,null,null);
insert into analy_jigyo values(2019,'3','���',        '7','�D���^�q',null,null,null);
insert into analy_jigyo values(2019,'4','�d�C',        '0','�d�C',null,null,null);
insert into analy_jigyo values(2019,'5','�K�X',        '0','�K�X',null,null,null);
insert into analy_jigyo values(2019,'6','�a�@',        '0','�a�@',null,null,null);
insert into analy_jigyo values(2019,'17','������1',    '1','����������',null,null,null);
insert into analy_jigyo values(2019,'17','������1',    '2','�������������',null,null,null);
insert into analy_jigyo values(2019,'17','������1',    '3','���扺����',null,null,null);
insert into analy_jigyo values(2019,'17','������1',    '4','�����������',null,null,null);
insert into analy_jigyo values(2019,'17','������1',    '5','�_�ƏW���r���{��',null,null,null);
insert into analy_jigyo values(2019,'17','������1',    '6','���ƏW��r���{��',null,null,null);
insert into analy_jigyo values(2019,'17','������1',    '7','�ыƏW���r���{��',null,null,null);
insert into analy_jigyo values(2019,'17','������1',    '8','�ȈՔr���{��',null,null,null);
insert into analy_jigyo values(2019,'17','������1',    '9','���K�͔r�������{��',null,null,null);
insert into analy_jigyo values(2019,'18','������2',    '0','����r�������{��',null,null,null);
insert into analy_jigyo values(2019,'18','������2',    '1','�ʔr�������{��',null,null,null);
insert into analy_jigyo values(2019,'8','�`�p',        '0','�`�p',null,null,null);
insert into analy_jigyo values(2019,'9','�s��',        '0','�s��',null,null,null);
insert into analy_jigyo values(2019,'10','�ƒ{��',     '0','�ƒ{��',null,null,null);
insert into analy_jigyo values(2019,'11','�ό�',       '1','�x�{�h��',null,null,null);
insert into analy_jigyo values(2019,'11','�ό�',       '2','����',null,null,null);
insert into analy_jigyo values(2019,'11','�ό�',       '3','���̑��ό�',null,null,null);
insert into analy_jigyo values(2019,'12','�',       '1','�ՊC�y�n����',null,null,null);
insert into analy_jigyo values(2019,'12','�',       '2','���̑�����',null,null,null);
insert into analy_jigyo values(2019,'13','���H',       '0','�L�����H',null,null,null);
insert into analy_jigyo values(2019,'14','���ԏ�',     '0','���ԏ�',null,null,null);
insert into analy_jigyo values(2019,'15','���̑�',     '0','���̑�',null,null,null);
insert into analy_jigyo values(2019,'16','���',       '0','���T�[�r�X',null,null,null);

commit;



insert into analy_jigyo values(2018,'1','����',        '0','�㐅��',null,null,null);
insert into analy_jigyo values(2018,'1','����',        '1','�ȈՐ���',null,null,null);
insert into analy_jigyo values(2018,'2','����',        '2','�H�Ɨp����',null,null,null);
insert into analy_jigyo values(2018,'3','���',        '1','�H�ʓd��',null,null,null);
insert into analy_jigyo values(2018,'3','���',        '3','�����ԉ^��',null,null,null);
insert into analy_jigyo values(2018,'3','���',        '5','�s�s�����S��',null,null,null);
insert into analy_jigyo values(2018,'3','���',        '6','�����d�ԓ�',null,null,null);
insert into analy_jigyo values(2018,'3','���',        '7','�D���^�q',null,null,null);
insert into analy_jigyo values(2018,'4','�d�C',        '0','�d�C',null,null,null);
insert into analy_jigyo values(2018,'5','�K�X',        '0','�K�X',null,null,null);
insert into analy_jigyo values(2018,'6','�a�@',        '0','�a�@',null,null,null);
insert into analy_jigyo values(2018,'17','������1',    '1','����������',null,null,null);
insert into analy_jigyo values(2018,'17','������1',    '2','�������������',null,null,null);
insert into analy_jigyo values(2018,'17','������1',    '3','���扺����',null,null,null);
insert into analy_jigyo values(2018,'17','������1',    '4','�����������',null,null,null);
insert into analy_jigyo values(2018,'17','������1',    '5','�_�ƏW���r���{��',null,null,null);
insert into analy_jigyo values(2018,'17','������1',    '6','���ƏW��r���{��',null,null,null);
insert into analy_jigyo values(2018,'17','������1',    '7','�ыƏW���r���{��',null,null,null);
insert into analy_jigyo values(2018,'17','������1',    '8','�ȈՔr���{��',null,null,null);
insert into analy_jigyo values(2018,'17','������1',    '9','���K�͔r�������{��',null,null,null);
insert into analy_jigyo values(2018,'18','������2',    '0','����r�������{��',null,null,null);
insert into analy_jigyo values(2018,'18','������2',    '1','�ʔr�������{��',null,null,null);
insert into analy_jigyo values(2018,'8','�`�p',        '0','�`�p',null,null,null);
insert into analy_jigyo values(2018,'9','�s��',        '0','�s��',null,null,null);
insert into analy_jigyo values(2018,'10','�ƒ{��',     '0','�ƒ{��',null,null,null);
insert into analy_jigyo values(2018,'11','�ό�',       '1','�x�{�h��',null,null,null);
insert into analy_jigyo values(2018,'11','�ό�',       '2','����',null,null,null);
insert into analy_jigyo values(2018,'11','�ό�',       '3','���̑��ό�',null,null,null);
insert into analy_jigyo values(2018,'12','�',       '1','�ՊC�y�n����',null,null,null);
insert into analy_jigyo values(2018,'12','�',       '2','���̑�����',null,null,null);
insert into analy_jigyo values(2018,'13','���H',       '0','�L�����H',null,null,null);
insert into analy_jigyo values(2018,'14','���ԏ�',     '0','���ԏ�',null,null,null);
insert into analy_jigyo values(2018,'15','���̑�',     '0','���̑�',null,null,null);
insert into analy_jigyo values(2018,'16','���',       '0','���T�[�r�X',null,null,null);

commit;


insert into analy_jigyo values(2017,'1','����',        '0','�㐅��',null,null,null);
insert into analy_jigyo values(2017,'1','����',        '1','�ȈՐ���',null,null,null);
insert into analy_jigyo values(2017,'2','����',        '2','�H�Ɨp����',null,null,null);
insert into analy_jigyo values(2017,'3','���',        '1','�H�ʓd��',null,null,null);
insert into analy_jigyo values(2017,'3','���',        '3','�����ԉ^��',null,null,null);
insert into analy_jigyo values(2017,'3','���',        '5','�s�s�����S��',null,null,null);
insert into analy_jigyo values(2017,'3','���',        '6','�����d�ԓ�',null,null,null);
insert into analy_jigyo values(2017,'3','���',        '7','�D���^�q',null,null,null);
insert into analy_jigyo values(2017,'4','�d�C',        '0','�d�C',null,null,null);
insert into analy_jigyo values(2017,'5','�K�X',        '0','�K�X',null,null,null);
insert into analy_jigyo values(2017,'6','�a�@',        '0','�a�@',null,null,null);
insert into analy_jigyo values(2017,'17','������1',    '1','����������',null,null,null);
insert into analy_jigyo values(2017,'17','������1',    '2','�������������',null,null,null);
insert into analy_jigyo values(2017,'17','������1',    '3','���扺����',null,null,null);
insert into analy_jigyo values(2017,'17','������1',    '4','�����������',null,null,null);
insert into analy_jigyo values(2017,'17','������1',    '5','�_�ƏW���r���{��',null,null,null);
insert into analy_jigyo values(2017,'17','������1',    '6','���ƏW��r���{��',null,null,null);
insert into analy_jigyo values(2017,'17','������1',    '7','�ыƏW���r���{��',null,null,null);
insert into analy_jigyo values(2017,'17','������1',    '8','�ȈՔr���{��',null,null,null);
insert into analy_jigyo values(2017,'17','������1',    '9','���K�͔r�������{��',null,null,null);
insert into analy_jigyo values(2017,'18','������2',    '0','����r�������{��',null,null,null);
insert into analy_jigyo values(2017,'18','������2',    '1','�ʔr�������{��',null,null,null);
insert into analy_jigyo values(2017,'8','�`�p',        '0','�`�p',null,null,null);
insert into analy_jigyo values(2017,'9','�s��',        '0','�s��',null,null,null);
insert into analy_jigyo values(2017,'10','�ƒ{��',     '0','�ƒ{��',null,null,null);
insert into analy_jigyo values(2017,'11','�ό�',       '1','�x�{�h��',null,null,null);
insert into analy_jigyo values(2017,'11','�ό�',       '2','����',null,null,null);
insert into analy_jigyo values(2017,'11','�ό�',       '3','���̑��ό�',null,null,null);
insert into analy_jigyo values(2017,'12','�',       '1','�ՊC�y�n����',null,null,null);
insert into analy_jigyo values(2017,'12','�',       '2','���̑�����',null,null,null);
insert into analy_jigyo values(2017,'13','���H',       '0','�L�����H',null,null,null);
insert into analy_jigyo values(2017,'14','���ԏ�',     '0','���ԏ�',null,null,null);
insert into analy_jigyo values(2017,'15','���̑�',     '0','���̑�',null,null,null);
insert into analy_jigyo values(2017,'16','���',       '0','���T�[�r�X',null,null,null);

commit;


insert into analy_jigyo values(2016,'1','����',        '0','�㐅��',null,null,null);
insert into analy_jigyo values(2016,'1','����',        '1','�ȈՐ���',null,null,null);
insert into analy_jigyo values(2016,'2','����',        '2','�H�Ɨp����',null,null,null);
insert into analy_jigyo values(2016,'3','���',        '1','�H�ʓd��',null,null,null);
insert into analy_jigyo values(2016,'3','���',        '3','�����ԉ^��',null,null,null);
insert into analy_jigyo values(2016,'3','���',        '5','�s�s�����S��',null,null,null);
insert into analy_jigyo values(2016,'3','���',        '6','�����d�ԓ�',null,null,null);
insert into analy_jigyo values(2016,'3','���',        '7','�D���^�q',null,null,null);
insert into analy_jigyo values(2016,'4','�d�C',        '0','�d�C',null,null,null);
insert into analy_jigyo values(2016,'5','�K�X',        '0','�K�X',null,null,null);
insert into analy_jigyo values(2016,'6','�a�@',        '0','�a�@',null,null,null);
insert into analy_jigyo values(2016,'17','������1',    '1','����������',null,null,null);
insert into analy_jigyo values(2016,'17','������1',    '2','�������������',null,null,null);
insert into analy_jigyo values(2016,'17','������1',    '3','���扺����',null,null,null);
insert into analy_jigyo values(2016,'17','������1',    '4','�����������',null,null,null);
insert into analy_jigyo values(2016,'17','������1',    '5','�_�ƏW���r���{��',null,null,null);
insert into analy_jigyo values(2016,'17','������1',    '6','���ƏW��r���{��',null,null,null);
insert into analy_jigyo values(2016,'17','������1',    '7','�ыƏW���r���{��',null,null,null);
insert into analy_jigyo values(2016,'17','������1',    '8','�ȈՔr���{��',null,null,null);
insert into analy_jigyo values(2016,'17','������1',    '9','���K�͔r�������{��',null,null,null);
insert into analy_jigyo values(2016,'18','������2',    '0','����r�������{��',null,null,null);
insert into analy_jigyo values(2016,'18','������2',    '1','�ʔr�������{��',null,null,null);
insert into analy_jigyo values(2016,'8','�`�p',        '0','�`�p',null,null,null);
insert into analy_jigyo values(2016,'9','�s��',        '0','�s��',null,null,null);
insert into analy_jigyo values(2016,'10','�ƒ{��',     '0','�ƒ{��',null,null,null);
insert into analy_jigyo values(2016,'11','�ό�',       '1','�x�{�h��',null,null,null);
insert into analy_jigyo values(2016,'11','�ό�',       '2','����',null,null,null);
insert into analy_jigyo values(2016,'11','�ό�',       '3','���̑��ό�',null,null,null);
insert into analy_jigyo values(2016,'12','�',       '1','�ՊC�y�n����',null,null,null);
insert into analy_jigyo values(2016,'12','�',       '2','���̑�����',null,null,null);
insert into analy_jigyo values(2016,'13','���H',       '0','�L�����H',null,null,null);
insert into analy_jigyo values(2016,'14','���ԏ�',     '0','���ԏ�',null,null,null);
insert into analy_jigyo values(2016,'15','���̑�',     '0','���̑�',null,null,null);
insert into analy_jigyo values(2016,'16','���',       '0','���T�[�r�X',null,null,null);

commit;



insert into analy_jigyo values(2015,'1','����',        '0','�㐅��',null,null,null);
insert into analy_jigyo values(2015,'1','����',        '1','�ȈՐ���',null,null,null);
insert into analy_jigyo values(2015,'2','����',        '2','�H�Ɨp����',null,null,null);
insert into analy_jigyo values(2015,'3','���',        '1','�H�ʓd��',null,null,null);
insert into analy_jigyo values(2015,'3','���',        '3','�����ԉ^��',null,null,null);
insert into analy_jigyo values(2015,'3','���',        '5','�s�s�����S��',null,null,null);
insert into analy_jigyo values(2015,'3','���',        '6','�����d�ԓ�',null,null,null);
insert into analy_jigyo values(2015,'3','���',        '7','�D���^�q',null,null,null);
insert into analy_jigyo values(2015,'4','�d�C',        '0','�d�C',null,null,null);
insert into analy_jigyo values(2015,'5','�K�X',        '0','�K�X',null,null,null);
insert into analy_jigyo values(2015,'6','�a�@',        '0','�a�@',null,null,null);
insert into analy_jigyo values(2015,'17','������1',    '1','����������',null,null,null);
insert into analy_jigyo values(2015,'17','������1',    '2','�������������',null,null,null);
insert into analy_jigyo values(2015,'17','������1',    '3','���扺����',null,null,null);
insert into analy_jigyo values(2015,'17','������1',    '4','�����������',null,null,null);
insert into analy_jigyo values(2015,'17','������1',    '5','�_�ƏW���r���{��',null,null,null);
insert into analy_jigyo values(2015,'17','������1',    '6','���ƏW��r���{��',null,null,null);
insert into analy_jigyo values(2015,'17','������1',    '7','�ыƏW���r���{��',null,null,null);
insert into analy_jigyo values(2015,'17','������1',    '8','�ȈՔr���{��',null,null,null);
insert into analy_jigyo values(2015,'17','������1',    '9','���K�͔r�������{��',null,null,null);
insert into analy_jigyo values(2015,'18','������2',    '0','����r�������{��',null,null,null);
insert into analy_jigyo values(2015,'18','������2',    '1','�ʔr�������{��',null,null,null);
insert into analy_jigyo values(2015,'8','�`�p',        '0','�`�p',null,null,null);
insert into analy_jigyo values(2015,'9','�s��',        '0','�s��',null,null,null);
insert into analy_jigyo values(2015,'10','�ƒ{��',     '0','�ƒ{��',null,null,null);
insert into analy_jigyo values(2015,'11','�ό�',       '1','�x�{�h��',null,null,null);
insert into analy_jigyo values(2015,'11','�ό�',       '2','����',null,null,null);
insert into analy_jigyo values(2015,'11','�ό�',       '3','���̑��ό�',null,null,null);
insert into analy_jigyo values(2015,'12','�',       '1','�ՊC�y�n����',null,null,null);
insert into analy_jigyo values(2015,'12','�',       '2','���̑�����',null,null,null);
insert into analy_jigyo values(2015,'13','���H',       '0','�L�����H',null,null,null);
insert into analy_jigyo values(2015,'14','���ԏ�',     '0','���ԏ�',null,null,null);
insert into analy_jigyo values(2015,'15','���̑�',     '0','���̑�',null,null,null);
insert into analy_jigyo values(2015,'16','���',       '0','���T�[�r�X',null,null,null);

commit;

