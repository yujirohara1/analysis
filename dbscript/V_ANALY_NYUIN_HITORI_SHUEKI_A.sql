drop view V_ANALY_NYUIN_HITORI_SHUEKI_A;

create 
or replace view V_ANALY_NYUIN_HITORI_SHUEKI_A as 
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
    ,nyuin_shueki
    ,nobe_kanja_kei
    , round(case 
        when (nobe_kanja_kei) <= 0 
            then null 
        else ((nyuin_shueki) / (nobe_kanja_kei)) * 100 
        end) hitori_ichinichi_shueki
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
            , sum(case when hyo_num = 20 and gyo_num = 1 and retu_num = 3  then val_num else 0 end) nyuin_shueki
            , sum(case when hyo_num = 27 and gyo_num = 1 and retu_num = 6  then val_num else 0 end) nobe_kanja_kei
        from
            analy_main a 
        where
            (hyo_num = 20 and gyo_num = 1 and retu_num = 3)  or
            (hyo_num = 27 and gyo_num = 1 and retu_num = 6)  
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

