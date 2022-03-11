drop view V_ANALY_JUGYOIN_HITORI_RIEKI_A;

create 
or replace view V_ANALY_JUGYOIN_HITORI_RIEKI_A as 
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
    , kimatu_ninzu
    , eigyo_shueki
    , eigyo_hiyo
    , round(case 
        when (kimatu_ninzu) <= 0 
            then null 
        else ((eigyo_shueki - eigyo_hiyo) / (kimatu_ninzu)) 
        end) hitori_rieki
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
            , sum(case when hyo_num = 21 and gyo_num = 1 and retu_num = 31  then val_num else 0 end) kimatu_ninzu
            , sum(case when hyo_num = 20 and gyo_num = 1 and retu_num = 2   then val_num else 0 end) eigyo_shueki
            , sum(case when hyo_num = 20 and gyo_num = 1 and retu_num = 26  then val_num else 0 end) eigyo_hiyo
        from
            analy_main a 
        where
            (hyo_num = 21 and gyo_num = 1 and retu_num = 31) or
            (hyo_num = 20 and gyo_num = 1 and retu_num in (2, 26))
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
    ) a;

