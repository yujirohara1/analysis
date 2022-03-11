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

    



insert into analy_jigyo values(2020,'01','水道',       '0','上水道',null,null,null);
insert into analy_jigyo values(2020,'01','水道',       '1','簡易水道',null,null,null);
insert into analy_jigyo values(2020,'02','水道',       '2','工業用水道',null,null,null);
insert into analy_jigyo values(2020,'03','交通',       '1','路面電車',null,null,null);
insert into analy_jigyo values(2020,'03','交通',       '3','自動車運送',null,null,null);
insert into analy_jigyo values(2020,'03','交通',       '5','都市高速鉄道',null,null,null);
insert into analy_jigyo values(2020,'03','交通',       '6','懸垂電車等',null,null,null);
insert into analy_jigyo values(2020,'03','交通',       '7','船舶運航',null,null,null);
insert into analy_jigyo values(2020,'04','電気',       '0','電気',null,null,null);
insert into analy_jigyo values(2020,'05','ガス',       '0','ガス',null,null,null);
insert into analy_jigyo values(2020,'06','病院',       '0','病院',null,null,null);
insert into analy_jigyo values(2020,'17','下水道1',    '1','公共下水道',null,null,null);
insert into analy_jigyo values(2020,'17','下水道1',    '2','特定公共下水道',null,null,null);
insert into analy_jigyo values(2020,'17','下水道1',    '3','流域下水道',null,null,null);
insert into analy_jigyo values(2020,'17','下水道1',    '4','特定環境下水道',null,null,null);
insert into analy_jigyo values(2020,'17','下水道1',    '5','農業集落排水施設',null,null,null);
insert into analy_jigyo values(2020,'17','下水道1',    '6','漁業集約排水施設',null,null,null);
insert into analy_jigyo values(2020,'17','下水道1',    '7','林業集落排水施設',null,null,null);
insert into analy_jigyo values(2020,'17','下水道1',    '8','簡易排水施設',null,null,null);
insert into analy_jigyo values(2020,'17','下水道1',    '9','小規模排水処理施設',null,null,null);
insert into analy_jigyo values(2020,'18','下水道2',    '0','特定排水処理施設',null,null,null);
insert into analy_jigyo values(2020,'18','下水道2',    '1','個別排水処理施設',null,null,null);
insert into analy_jigyo values(2020,'08','港湾',       '0','港湾',null,null,null);
insert into analy_jigyo values(2020,'09','市場',       '0','市場',null,null,null);
insert into analy_jigyo values(2020,'10','と畜場',     '0','と畜場',null,null,null);
insert into analy_jigyo values(2020,'11','観光',       '1','休養宿泊',null,null,null);
insert into analy_jigyo values(2020,'11','観光',       '2','索道',null,null,null);
insert into analy_jigyo values(2020,'11','観光',       '3','その他観光',null,null,null);
insert into analy_jigyo values(2020,'12','宅造',       '1','臨海土地造成',null,null,null);
insert into analy_jigyo values(2020,'12','宅造',       '2','その他造成',null,null,null);
insert into analy_jigyo values(2020,'13','道路',       '0','有料道路',null,null,null);
insert into analy_jigyo values(2020,'14','駐車場',     '0','駐車場',null,null,null);
insert into analy_jigyo values(2020,'15','その他',     '0','その他',null,null,null);
insert into analy_jigyo values(2020,'16','介護',       '0','介護サービス',null,null,null);

commit;






insert into analy_jigyo values(2019,'01','水道',       '0','上水道',null,null,null);
insert into analy_jigyo values(2019,'01','水道',       '1','簡易水道',null,null,null);
insert into analy_jigyo values(2019,'02','水道',       '2','工業用水道',null,null,null);
insert into analy_jigyo values(2019,'03','交通',       '1','路面電車',null,null,null);
insert into analy_jigyo values(2019,'03','交通',       '3','自動車運送',null,null,null);
insert into analy_jigyo values(2019,'03','交通',       '5','都市高速鉄道',null,null,null);
insert into analy_jigyo values(2019,'03','交通',       '6','懸垂電車等',null,null,null);
insert into analy_jigyo values(2019,'03','交通',       '7','船舶運航',null,null,null);
insert into analy_jigyo values(2019,'04','電気',       '0','電気',null,null,null);
insert into analy_jigyo values(2019,'05','ガス',       '0','ガス',null,null,null);
insert into analy_jigyo values(2019,'06','病院',       '0','病院',null,null,null);
insert into analy_jigyo values(2019,'17','下水道1',    '1','公共下水道',null,null,null);
insert into analy_jigyo values(2019,'17','下水道1',    '2','特定公共下水道',null,null,null);
insert into analy_jigyo values(2019,'17','下水道1',    '3','流域下水道',null,null,null);
insert into analy_jigyo values(2019,'17','下水道1',    '4','特定環境下水道',null,null,null);
insert into analy_jigyo values(2019,'17','下水道1',    '5','農業集落排水施設',null,null,null);
insert into analy_jigyo values(2019,'17','下水道1',    '6','漁業集約排水施設',null,null,null);
insert into analy_jigyo values(2019,'17','下水道1',    '7','林業集落排水施設',null,null,null);
insert into analy_jigyo values(2019,'17','下水道1',    '8','簡易排水施設',null,null,null);
insert into analy_jigyo values(2019,'17','下水道1',    '9','小規模排水処理施設',null,null,null);
insert into analy_jigyo values(2019,'18','下水道2',    '0','特定排水処理施設',null,null,null);
insert into analy_jigyo values(2019,'18','下水道2',    '1','個別排水処理施設',null,null,null);
insert into analy_jigyo values(2019,'08','港湾',       '0','港湾',null,null,null);
insert into analy_jigyo values(2019,'09','市場',       '0','市場',null,null,null);
insert into analy_jigyo values(2019,'10','と畜場',     '0','と畜場',null,null,null);
insert into analy_jigyo values(2019,'11','観光',       '1','休養宿泊',null,null,null);
insert into analy_jigyo values(2019,'11','観光',       '2','索道',null,null,null);
insert into analy_jigyo values(2019,'11','観光',       '3','その他観光',null,null,null);
insert into analy_jigyo values(2019,'12','宅造',       '1','臨海土地造成',null,null,null);
insert into analy_jigyo values(2019,'12','宅造',       '2','その他造成',null,null,null);
insert into analy_jigyo values(2019,'13','道路',       '0','有料道路',null,null,null);
insert into analy_jigyo values(2019,'14','駐車場',     '0','駐車場',null,null,null);
insert into analy_jigyo values(2019,'15','その他',     '0','その他',null,null,null);
insert into analy_jigyo values(2019,'16','介護',       '0','介護サービス',null,null,null);

commit;


insert into analy_jigyo values(2018,'01','水道',       '0','上水道',null,null,null);
insert into analy_jigyo values(2018,'01','水道',       '1','簡易水道',null,null,null);
insert into analy_jigyo values(2018,'02','水道',       '2','工業用水道',null,null,null);
insert into analy_jigyo values(2018,'03','交通',       '1','路面電車',null,null,null);
insert into analy_jigyo values(2018,'03','交通',       '3','自動車運送',null,null,null);
insert into analy_jigyo values(2018,'03','交通',       '5','都市高速鉄道',null,null,null);
insert into analy_jigyo values(2018,'03','交通',       '6','懸垂電車等',null,null,null);
insert into analy_jigyo values(2018,'03','交通',       '7','船舶運航',null,null,null);
insert into analy_jigyo values(2018,'04','電気',       '0','電気',null,null,null);
insert into analy_jigyo values(2018,'05','ガス',       '0','ガス',null,null,null);
insert into analy_jigyo values(2018,'06','病院',       '0','病院',null,null,null);
insert into analy_jigyo values(2018,'17','下水道1',    '1','公共下水道',null,null,null);
insert into analy_jigyo values(2018,'17','下水道1',    '2','特定公共下水道',null,null,null);
insert into analy_jigyo values(2018,'17','下水道1',    '3','流域下水道',null,null,null);
insert into analy_jigyo values(2018,'17','下水道1',    '4','特定環境下水道',null,null,null);
insert into analy_jigyo values(2018,'17','下水道1',    '5','農業集落排水施設',null,null,null);
insert into analy_jigyo values(2018,'17','下水道1',    '6','漁業集約排水施設',null,null,null);
insert into analy_jigyo values(2018,'17','下水道1',    '7','林業集落排水施設',null,null,null);
insert into analy_jigyo values(2018,'17','下水道1',    '8','簡易排水施設',null,null,null);
insert into analy_jigyo values(2018,'17','下水道1',    '9','小規模排水処理施設',null,null,null);
insert into analy_jigyo values(2018,'18','下水道2',    '0','特定排水処理施設',null,null,null);
insert into analy_jigyo values(2018,'18','下水道2',    '1','個別排水処理施設',null,null,null);
insert into analy_jigyo values(2018,'08','港湾',       '0','港湾',null,null,null);
insert into analy_jigyo values(2018,'09','市場',       '0','市場',null,null,null);
insert into analy_jigyo values(2018,'10','と畜場',     '0','と畜場',null,null,null);
insert into analy_jigyo values(2018,'11','観光',       '1','休養宿泊',null,null,null);
insert into analy_jigyo values(2018,'11','観光',       '2','索道',null,null,null);
insert into analy_jigyo values(2018,'11','観光',       '3','その他観光',null,null,null);
insert into analy_jigyo values(2018,'12','宅造',       '1','臨海土地造成',null,null,null);
insert into analy_jigyo values(2018,'12','宅造',       '2','その他造成',null,null,null);
insert into analy_jigyo values(2018,'13','道路',       '0','有料道路',null,null,null);
insert into analy_jigyo values(2018,'14','駐車場',     '0','駐車場',null,null,null);
insert into analy_jigyo values(2018,'15','その他',     '0','その他',null,null,null);
insert into analy_jigyo values(2018,'16','介護',       '0','介護サービス',null,null,null);

commit;




insert into analy_jigyo values(2017,'01','水道',       '0','上水道',null,null,null);
insert into analy_jigyo values(2017,'01','水道',       '1','簡易水道',null,null,null);
insert into analy_jigyo values(2017,'02','水道',       '2','工業用水道',null,null,null);
insert into analy_jigyo values(2017,'03','交通',       '1','路面電車',null,null,null);
insert into analy_jigyo values(2017,'03','交通',       '3','自動車運送',null,null,null);
insert into analy_jigyo values(2017,'03','交通',       '5','都市高速鉄道',null,null,null);
insert into analy_jigyo values(2017,'03','交通',       '6','懸垂電車等',null,null,null);
insert into analy_jigyo values(2017,'03','交通',       '7','船舶運航',null,null,null);
insert into analy_jigyo values(2017,'04','電気',       '0','電気',null,null,null);
insert into analy_jigyo values(2017,'05','ガス',       '0','ガス',null,null,null);
insert into analy_jigyo values(2017,'06','病院',       '0','病院',null,null,null);
insert into analy_jigyo values(2017,'17','下水道1',    '1','公共下水道',null,null,null);
insert into analy_jigyo values(2017,'17','下水道1',    '2','特定公共下水道',null,null,null);
insert into analy_jigyo values(2017,'17','下水道1',    '3','流域下水道',null,null,null);
insert into analy_jigyo values(2017,'17','下水道1',    '4','特定環境下水道',null,null,null);
insert into analy_jigyo values(2017,'17','下水道1',    '5','農業集落排水施設',null,null,null);
insert into analy_jigyo values(2017,'17','下水道1',    '6','漁業集約排水施設',null,null,null);
insert into analy_jigyo values(2017,'17','下水道1',    '7','林業集落排水施設',null,null,null);
insert into analy_jigyo values(2017,'17','下水道1',    '8','簡易排水施設',null,null,null);
insert into analy_jigyo values(2017,'17','下水道1',    '9','小規模排水処理施設',null,null,null);
insert into analy_jigyo values(2017,'18','下水道2',    '0','特定排水処理施設',null,null,null);
insert into analy_jigyo values(2017,'18','下水道2',    '1','個別排水処理施設',null,null,null);
insert into analy_jigyo values(2017,'08','港湾',       '0','港湾',null,null,null);
insert into analy_jigyo values(2017,'09','市場',       '0','市場',null,null,null);
insert into analy_jigyo values(2017,'10','と畜場',     '0','と畜場',null,null,null);
insert into analy_jigyo values(2017,'11','観光',       '1','休養宿泊',null,null,null);
insert into analy_jigyo values(2017,'11','観光',       '2','索道',null,null,null);
insert into analy_jigyo values(2017,'11','観光',       '3','その他観光',null,null,null);
insert into analy_jigyo values(2017,'12','宅造',       '1','臨海土地造成',null,null,null);
insert into analy_jigyo values(2017,'12','宅造',       '2','その他造成',null,null,null);
insert into analy_jigyo values(2017,'13','道路',       '0','有料道路',null,null,null);
insert into analy_jigyo values(2017,'14','駐車場',     '0','駐車場',null,null,null);
insert into analy_jigyo values(2017,'15','その他',     '0','その他',null,null,null);
insert into analy_jigyo values(2017,'16','介護',       '0','介護サービス',null,null,null);

commit;





insert into analy_jigyo values(2016,'01','水道',       '0','上水道',null,null,null);
insert into analy_jigyo values(2016,'01','水道',       '1','簡易水道',null,null,null);
insert into analy_jigyo values(2016,'02','水道',       '2','工業用水道',null,null,null);
insert into analy_jigyo values(2016,'03','交通',       '1','路面電車',null,null,null);
insert into analy_jigyo values(2016,'03','交通',       '3','自動車運送',null,null,null);
insert into analy_jigyo values(2016,'03','交通',       '5','都市高速鉄道',null,null,null);
insert into analy_jigyo values(2016,'03','交通',       '6','懸垂電車等',null,null,null);
insert into analy_jigyo values(2016,'03','交通',       '7','船舶運航',null,null,null);
insert into analy_jigyo values(2016,'04','電気',       '0','電気',null,null,null);
insert into analy_jigyo values(2016,'05','ガス',       '0','ガス',null,null,null);
insert into analy_jigyo values(2016,'06','病院',       '0','病院',null,null,null);
insert into analy_jigyo values(2016,'17','下水道1',    '1','公共下水道',null,null,null);
insert into analy_jigyo values(2016,'17','下水道1',    '2','特定公共下水道',null,null,null);
insert into analy_jigyo values(2016,'17','下水道1',    '3','流域下水道',null,null,null);
insert into analy_jigyo values(2016,'17','下水道1',    '4','特定環境下水道',null,null,null);
insert into analy_jigyo values(2016,'17','下水道1',    '5','農業集落排水施設',null,null,null);
insert into analy_jigyo values(2016,'17','下水道1',    '6','漁業集約排水施設',null,null,null);
insert into analy_jigyo values(2016,'17','下水道1',    '7','林業集落排水施設',null,null,null);
insert into analy_jigyo values(2016,'17','下水道1',    '8','簡易排水施設',null,null,null);
insert into analy_jigyo values(2016,'17','下水道1',    '9','小規模排水処理施設',null,null,null);
insert into analy_jigyo values(2016,'18','下水道2',    '0','特定排水処理施設',null,null,null);
insert into analy_jigyo values(2016,'18','下水道2',    '1','個別排水処理施設',null,null,null);
insert into analy_jigyo values(2016,'08','港湾',       '0','港湾',null,null,null);
insert into analy_jigyo values(2016,'09','市場',       '0','市場',null,null,null);
insert into analy_jigyo values(2016,'10','と畜場',     '0','と畜場',null,null,null);
insert into analy_jigyo values(2016,'11','観光',       '1','休養宿泊',null,null,null);
insert into analy_jigyo values(2016,'11','観光',       '2','索道',null,null,null);
insert into analy_jigyo values(2016,'11','観光',       '3','その他観光',null,null,null);
insert into analy_jigyo values(2016,'12','宅造',       '1','臨海土地造成',null,null,null);
insert into analy_jigyo values(2016,'12','宅造',       '2','その他造成',null,null,null);
insert into analy_jigyo values(2016,'13','道路',       '0','有料道路',null,null,null);
insert into analy_jigyo values(2016,'14','駐車場',     '0','駐車場',null,null,null);
insert into analy_jigyo values(2016,'15','その他',     '0','その他',null,null,null);
insert into analy_jigyo values(2016,'16','介護',       '0','介護サービス',null,null,null);

commit;





insert into analy_jigyo values(2015,'01','水道',       '0','上水道',null,null,null);
insert into analy_jigyo values(2015,'01','水道',       '1','簡易水道',null,null,null);
insert into analy_jigyo values(2015,'02','水道',       '2','工業用水道',null,null,null);
insert into analy_jigyo values(2015,'03','交通',       '1','路面電車',null,null,null);
insert into analy_jigyo values(2015,'03','交通',       '3','自動車運送',null,null,null);
insert into analy_jigyo values(2015,'03','交通',       '5','都市高速鉄道',null,null,null);
insert into analy_jigyo values(2015,'03','交通',       '6','懸垂電車等',null,null,null);
insert into analy_jigyo values(2015,'03','交通',       '7','船舶運航',null,null,null);
insert into analy_jigyo values(2015,'04','電気',       '0','電気',null,null,null);
insert into analy_jigyo values(2015,'05','ガス',       '0','ガス',null,null,null);
insert into analy_jigyo values(2015,'06','病院',       '0','病院',null,null,null);
insert into analy_jigyo values(2015,'17','下水道1',    '1','公共下水道',null,null,null);
insert into analy_jigyo values(2015,'17','下水道1',    '2','特定公共下水道',null,null,null);
insert into analy_jigyo values(2015,'17','下水道1',    '3','流域下水道',null,null,null);
insert into analy_jigyo values(2015,'17','下水道1',    '4','特定環境下水道',null,null,null);
insert into analy_jigyo values(2015,'17','下水道1',    '5','農業集落排水施設',null,null,null);
insert into analy_jigyo values(2015,'17','下水道1',    '6','漁業集約排水施設',null,null,null);
insert into analy_jigyo values(2015,'17','下水道1',    '7','林業集落排水施設',null,null,null);
insert into analy_jigyo values(2015,'17','下水道1',    '8','簡易排水施設',null,null,null);
insert into analy_jigyo values(2015,'17','下水道1',    '9','小規模排水処理施設',null,null,null);
insert into analy_jigyo values(2015,'18','下水道2',    '0','特定排水処理施設',null,null,null);
insert into analy_jigyo values(2015,'18','下水道2',    '1','個別排水処理施設',null,null,null);
insert into analy_jigyo values(2015,'08','港湾',       '0','港湾',null,null,null);
insert into analy_jigyo values(2015,'09','市場',       '0','市場',null,null,null);
insert into analy_jigyo values(2015,'10','と畜場',     '0','と畜場',null,null,null);
insert into analy_jigyo values(2015,'11','観光',       '1','休養宿泊',null,null,null);
insert into analy_jigyo values(2015,'11','観光',       '2','索道',null,null,null);
insert into analy_jigyo values(2015,'11','観光',       '3','その他観光',null,null,null);
insert into analy_jigyo values(2015,'12','宅造',       '1','臨海土地造成',null,null,null);
insert into analy_jigyo values(2015,'12','宅造',       '2','その他造成',null,null,null);
insert into analy_jigyo values(2015,'13','道路',       '0','有料道路',null,null,null);
insert into analy_jigyo values(2015,'14','駐車場',     '0','駐車場',null,null,null);
insert into analy_jigyo values(2015,'15','その他',     '0','その他',null,null,null);
insert into analy_jigyo values(2015,'16','介護',       '0','介護サービス',null,null,null);

commit;

