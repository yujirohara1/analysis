drop view V_ANALY_SIHON_SEICHORITU_A; 

create 
or replace view V_ANALY_SIHON_SEICHORITU_A as 
select
    a.nendo
    , a.gyomu_cd
    , a.gyoshu_cd
    , a.jigyo_cd
    , a.dantai_cd
    , a.dantai_nm
    , a.sisetu_cd
    , a.sisetu_nm
    , a.joken_1
    , a.joken_2
    , a.joken_3
    , a.joken_4
    , a.joken_5
    , a.joken_6
    , a.joken_7
    , a.joken_8
    , a.joken_9
    , a.sihon_kei sihon_toki
    , b.sihon_kei sihon_zenki
    , round( 
        case 
            when ( 
                (b.sihon_kei)
            ) = 0 
                then null 
            else ( 
                ( 
                    ( 
                        a.sihon_kei
                    ) - ( 
                        b.sihon_kei
                    )
                ) / ( 
                    b.sihon_kei
                )
            ) * 100 
            end
    ) seicho_ritu 
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
            , sum(val_num) sihon_kei
        from
            analy_main a 
        where
            hyo_num = 22
            and gyo_num = 1 
            and retu_num = 68
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
    left join ( 
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
            , sum(val_num) sihon_kei
        from
            analy_main a 
        where
            hyo_num = 22
            and gyo_num = 1 
            and retu_num = 68
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
    ) b 
        on a.nendo = (b.nendo + 1) 
        and a.gyomu_cd = b.gyomu_cd 
        and a.gyoshu_cd = b.gyoshu_cd 
        and a.jigyo_cd = b.jigyo_cd 
        and a.dantai_cd = b.dantai_cd 
        and a.sisetu_cd = b.sisetu_cd;
