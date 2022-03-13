drop view V_ANALY_BYOSHO_RIYORITU_A;

create 
or replace view V_ANALY_BYOSHO_RIYORITU_A as 
select
    a.nendo
    , a.gyomu_cd
    , a.gyoshu_cd
    , a.jigyo_cd
    , a.dantai_cd
    , a.dantai_nm
    , a.sisetu_cd
    , case when a.sisetu_nm = 'NaN' then b.jigyo_nm else a.sisetu_nm end 
    , joken_1
    , joken_2
    , joken_3
    , joken_4
    , joken_5
    , joken_6
    , joken_7
    , joken_8
    , joken_9
    ,nobe_kanja_kei
    ,nobe_byosho_kei
    , round(case 
        when (nobe_byosho_kei) <= 0 
            then null 
        else ((nobe_kanja_kei) / (nobe_byosho_kei)) * 100 
        end) riyoritu
from
    ( 
        select
            nendo
            , gyomu_cd
            , gyoshu_cd
            , jigyo_cd
            , dantai_cd
            , dantai_nm
            , sisetu_cd
            , sisetu_nm
            , joken_1
            , joken_2
            , joken_3
            , joken_4
            , joken_5
            , joken_6
            , joken_7
            , joken_8
            , joken_9
            , sum(case when hyo_num = 27 and gyo_num = 1 and retu_num = 6  then val_num else 0 end) nobe_kanja_kei
            , sum(case when hyo_num = 27 and gyo_num = 1 and retu_num = 12  then val_num else 0 end) nobe_byosho_kei
        from
            analy_main a 
        where
            (hyo_num = 27 and gyo_num = 1 and retu_num in (6,12))  
        group by
            nendo
            , gyomu_cd
            , gyoshu_cd
            , jigyo_cd
            , dantai_cd
            , dantai_nm
            , sisetu_cd
            , sisetu_nm
            , joken_1
            , joken_2
            , joken_3
            , joken_4
            , joken_5
            , joken_6
            , joken_7
            , joken_8
            , joken_9
    ) a
    join analy_jigyo b
on
    a.nendo = b.nendo and
    a.gyoshu_cd = b.gyoshu_cd and
    a.jigyo_cd = b.jigyo_cd
;
