delete from analy_main where nendo <> 2020;


drop table analy_main_wk;
create table analy_main_wk as select * from analy_Main where nendo = 2020;
update analy_main_wk set nendo = 2019, val_num = round(val_num * ( mod(val_num, 10)/10+0.5  ));
insert into analy_main select * from analy_main_wk;



drop table analy_main_wk;
create table analy_main_wk as select * from analy_Main where nendo = 2019;
update analy_main_wk set nendo = 2018, val_num = round(val_num * ( mod(val_num, 10)/10+0.5  ));
insert into analy_main select * from analy_main_wk;



drop table analy_main_wk;
create table analy_main_wk as select * from analy_Main where nendo = 2018;
update analy_main_wk set nendo = 2017, val_num = round(val_num * ( mod(val_num, 10)/10+0.5  ));
insert into analy_main select * from analy_main_wk;



drop table analy_main_wk;
create table analy_main_wk as select * from analy_Main where nendo = 2017;
update analy_main_wk set nendo = 2016, val_num = round(val_num * ( mod(val_num, 10)/10+0.5  ));
insert into analy_main select * from analy_main_wk;



drop table analy_main_wk;
create table analy_main_wk as select * from analy_Main where nendo = 2016;
update analy_main_wk set nendo = 2015, val_num = round(val_num * ( mod(val_num, 10)/10+0.5  ));
insert into analy_main select * from analy_main_wk;




drop table analy_gyoretu_wk;
create table analy_gyoretu_wk as select * from analy_gyoretu where nendo = 2020;

update analy_gyoretu_wk set nendo = 2015;
insert into analy_gyoretu select * from analy_gyoretu_wk;

update analy_gyoretu_wk set nendo = 2016;
insert into analy_gyoretu select * from analy_gyoretu_wk;


update analy_gyoretu_wk set nendo = 2017;
insert into analy_gyoretu select * from analy_gyoretu_wk;


update analy_gyoretu_wk set nendo = 2018;
insert into analy_gyoretu select * from analy_gyoretu_wk;

update analy_gyoretu_wk set nendo = 2019;
insert into analy_gyoretu select * from analy_gyoretu_wk;

