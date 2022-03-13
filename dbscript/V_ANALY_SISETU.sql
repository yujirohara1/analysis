drop view V_ANALY_SISETU; 

create 
or replace view V_ANALY_SISETU as 
select
    max(a.nendo) nendo
    , a.gyomu_cd
    , a.gyoshu_cd
    , a.jigyo_cd
    , lpad(trim(a.dantai_cd),6,'0') dantai_cd
    , min(a.dantai_nm) dantai_nm
    , a.sisetu_cd
    , min(case when a.sisetu_nm = 'NaN' then b.jigyo_nm else a.sisetu_nm end) sisetu_nm 
from
    analy_main a
    join analy_jigyo b
on
    a.nendo = b.nendo and
    a.gyoshu_cd = b.gyoshu_cd and
    a.jigyo_cd = b.jigyo_cd
where
    a.nendo = 2020 and
    a.hyo_num = 20 and
    a.gyo_num = 1 and
    a.retu_num = 10
group by
     a.gyomu_cd
    , a.gyoshu_cd
    , a.jigyo_cd
    , a.dantai_cd
    , a.sisetu_cd
;



select * from V_ANALY_SISETU;
