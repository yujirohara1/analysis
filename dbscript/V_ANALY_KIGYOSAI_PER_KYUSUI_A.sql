drop view V_ANALY_KIGYOSAI_PER_KYUSUI_A; 

create 
or replace view V_ANALY_KIGYOSAI_PER_KYUSUI_A as 
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
    ,kyusui_shueki
    ,kigyosai_gokei
    , round(case 
        when (kigyosai_gokei) <= 0 
            then null 
        else ((kyusui_shueki) / (kigyosai_gokei)) * 100 
        end) kigyosai_shueki_hiritu
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
            , sum(case when hyo_num = 20 and gyo_num = 1 and retu_num = 3  then val_num else 0 end) kyusui_shueki
            , sum(case when hyo_num = 24 and gyo_num = 1 and retu_num = 12  then val_num else 0 end) kigyosai_gokei
        from
            analy_main a 
        where
            (hyo_num = 20 and gyo_num = 1 and retu_num = 3)  or
            (hyo_num = 24 and gyo_num = 1 and retu_num = 12)  
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
