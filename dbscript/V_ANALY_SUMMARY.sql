drop view V_ANALY_SUMMARY; 

create 
or replace view V_ANALY_SUMMARY as 
select
   a.nendo,
   a.gyomu_cd::integer gyomu_cd,
   min(a.gyoshu_cd)::integer gyoshu_cd,
   sum(a.kensu) kensu,
   sum(a.kessan_g) kessan_g,
   substr(gyoshu_nm,1,3) gyoshu_nm,
   min(b.memo1) memo1
from
    (select
         nendo,
         gyomu_cd,
         gyoshu_cd,
         count(1) kensu,
         sum(val_num * 1000) kessan_g
     from
         analy_main
     where
         hyo_num = 20 and
         gyo_num = 1 and
         retu_num = 1
     group by
         nendo,
         gyomu_cd,
         gyoshu_cd
     ) a,
     (select nendo, gyoshu_cd, gyoshu_nm, memo1 from analy_jigyo group by nendo, gyoshu_cd, gyoshu_nm, memo1) b
where
    a.nendo = b.nendo and
    a.gyoshu_cd::integer = b.gyoshu_cd::integer 
group by
    a.nendo,
    a.gyomu_cd,
    substr(b.gyoshu_nm,1,3)
;



select * from V_ANALY_SUMMARY where nendo = 2020 order by gyomu_cd::integer, gyoshu_cd::integer;

