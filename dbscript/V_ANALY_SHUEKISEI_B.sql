drop view V_ANALY_SHUEKISEI_B; 

create 
or replace view V_ANALY_SHUEKISEI_B as 
with a as
    (select
          a.nendo
        , a.gyomu_cd
        , a.gyoshu_cd
        , a.jigyo_cd
        , a.dantai_cd
        , a.dantai_nm
        , a.sisetu_cd
        , case when a.sisetu_nm = 'NaN' then b.jigyo_nm else a.sisetu_nm end sisetu_nm
        , a.joken_1
        , a.joken_2
        , a.joken_3
        , a.joken_4
        , a.joken_5
        , a.joken_6
        , a.joken_7
        , a.joken_8
        , a.joken_9
        , sum(case when a.retu_num =  2 then a.val_num else 0 end) eigyo_shueki
        , sum(case when a.retu_num = 15 then a.val_num else 0 end) eigyo_gai_shueki
        , sum(case when a.retu_num = 26 then a.val_num else 0 end) eigyo_hiyo
        , sum(case when a.retu_num = 40 then a.val_num else 0 end) eigyo_gai_hiyo 
    from
        analy_main a 
    join analy_jigyo b
    on
        a.nendo = b.nendo and
        a.gyoshu_cd = b.gyoshu_cd and
        a.jigyo_cd = b.jigyo_cd
    where
        a.hyo_num = 20 
        and a.gyo_num = 1 
        and a.retu_num in (2, 15, 26, 40) 
    group by
        a.nendo
        , a.gyomu_cd
        , a.gyoshu_cd
        , a.jigyo_cd
        , a.dantai_cd
        , a.dantai_nm
        , a.sisetu_cd
        , case when a.sisetu_nm = 'NaN' then b.jigyo_nm else a.sisetu_nm   end
        , a.joken_1
        , a.joken_2
        , a.joken_3
        , a.joken_4
        , a.joken_5
        , a.joken_6
        , a.joken_7
        , a.joken_8
        , a.joken_9
    ) 
select
    a.nendo
    , a.gyomu_cd
    , a.gyoshu_cd
    , a.jigyo_cd
    , a.dantai_cd
    , a.dantai_nm
    , a.sisetu_cd
    , a.sisetu_nm
    , joken_1
    , joken_2
    , joken_3
    , joken_4
    , joken_5
    , joken_6
    , joken_7
    , joken_8
    , joken_9
    , eigyo_shueki
    , eigyo_gai_shueki
    , (eigyo_shueki + eigyo_gai_shueki) keijo_shueki
    , eigyo_hiyo
    , eigyo_gai_hiyo
    , (eigyo_hiyo + eigyo_gai_hiyo) keijo_hiyo
    , eigyo_shueki - eigyo_hiyo eigyo_soneki
    , (eigyo_shueki + eigyo_gai_shueki) - (eigyo_hiyo + eigyo_gai_hiyo) keijo_soneki
    , round(case 
        when (eigyo_hiyo) = 0 
            then null 
        else ((eigyo_shueki) / (eigyo_hiyo)) * 100 
        end) eigyo_shusi_hiritu
    , round(case 
        when (eigyo_hiyo + eigyo_gai_hiyo) = 0 
            then null 
        else ( 
            (eigyo_shueki + eigyo_gai_shueki) / (eigyo_hiyo + eigyo_gai_hiyo)
        ) * 100 
        end) keijo_shusi_hiritu 
from
    a
;
