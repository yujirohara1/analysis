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

    



insert into analy_jigyo values(2020,'01','…“¹',       '0','ã…“¹',null,null,null);
insert into analy_jigyo values(2020,'01','…“¹',       '1','ŠÈˆÕ…“¹',null,null,null);
insert into analy_jigyo values(2020,'02','…“¹',       '2','H‹Æ—p…“¹',null,null,null);
insert into analy_jigyo values(2020,'03','Œğ’Ê',       '1','˜H–Ê“dÔ',null,null,null);
insert into analy_jigyo values(2020,'03','Œğ’Ê',       '3','©“®Ô‰^‘—',null,null,null);
insert into analy_jigyo values(2020,'03','Œğ’Ê',       '5','“ss‚‘¬“S“¹',null,null,null);
insert into analy_jigyo values(2020,'03','Œğ’Ê',       '6','Œœ‚“dÔ“™',null,null,null);
insert into analy_jigyo values(2020,'03','Œğ’Ê',       '7','‘D”•‰^q',null,null,null);
insert into analy_jigyo values(2020,'04','“d‹C',       '0','“d‹C',null,null,null);
insert into analy_jigyo values(2020,'05','ƒKƒX',       '0','ƒKƒX',null,null,null);
insert into analy_jigyo values(2020,'06','•a‰@',       '0','•a‰@',null,null,null);
insert into analy_jigyo values(2020,'17','‰º…“¹1',    '1','Œö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2020,'17','‰º…“¹1',    '2','“Á’èŒö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2020,'17','‰º…“¹1',    '3','—¬ˆæ‰º…“¹',null,null,null);
insert into analy_jigyo values(2020,'17','‰º…“¹1',    '4','“Á’èŠÂ‹«‰º…“¹',null,null,null);
insert into analy_jigyo values(2020,'17','‰º…“¹1',    '5','”_‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2020,'17','‰º…“¹1',    '6','‹™‹ÆW–ñ”r…{İ',null,null,null);
insert into analy_jigyo values(2020,'17','‰º…“¹1',    '7','—Ñ‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2020,'17','‰º…“¹1',    '8','ŠÈˆÕ”r…{İ',null,null,null);
insert into analy_jigyo values(2020,'17','‰º…“¹1',    '9','¬‹K–Í”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2020,'18','‰º…“¹2',    '0','“Á’è”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2020,'18','‰º…“¹2',    '1','ŒÂ•Ê”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2020,'08','`˜p',       '0','`˜p',null,null,null);
insert into analy_jigyo values(2020,'09','sê',       '0','sê',null,null,null);
insert into analy_jigyo values(2020,'10','‚Æ’{ê',     '0','‚Æ’{ê',null,null,null);
insert into analy_jigyo values(2020,'11','ŠÏŒõ',       '1','‹x—{h”‘',null,null,null);
insert into analy_jigyo values(2020,'11','ŠÏŒõ',       '2','õ“¹',null,null,null);
insert into analy_jigyo values(2020,'11','ŠÏŒõ',       '3','‚»‚Ì‘¼ŠÏŒõ',null,null,null);
insert into analy_jigyo values(2020,'12','‘î‘¢',       '1','—ÕŠC“y’n‘¢¬',null,null,null);
insert into analy_jigyo values(2020,'12','‘î‘¢',       '2','‚»‚Ì‘¼‘¢¬',null,null,null);
insert into analy_jigyo values(2020,'13','“¹˜H',       '0','—L—¿“¹˜H',null,null,null);
insert into analy_jigyo values(2020,'14','’“Ôê',     '0','’“Ôê',null,null,null);
insert into analy_jigyo values(2020,'15','‚»‚Ì‘¼',     '0','‚»‚Ì‘¼',null,null,null);
insert into analy_jigyo values(2020,'16','‰îŒì',       '0','‰îŒìƒT[ƒrƒX',null,null,null);

commit;






insert into analy_jigyo values(2019,'01','…“¹',       '0','ã…“¹',null,null,null);
insert into analy_jigyo values(2019,'01','…“¹',       '1','ŠÈˆÕ…“¹',null,null,null);
insert into analy_jigyo values(2019,'02','…“¹',       '2','H‹Æ—p…“¹',null,null,null);
insert into analy_jigyo values(2019,'03','Œğ’Ê',       '1','˜H–Ê“dÔ',null,null,null);
insert into analy_jigyo values(2019,'03','Œğ’Ê',       '3','©“®Ô‰^‘—',null,null,null);
insert into analy_jigyo values(2019,'03','Œğ’Ê',       '5','“ss‚‘¬“S“¹',null,null,null);
insert into analy_jigyo values(2019,'03','Œğ’Ê',       '6','Œœ‚“dÔ“™',null,null,null);
insert into analy_jigyo values(2019,'03','Œğ’Ê',       '7','‘D”•‰^q',null,null,null);
insert into analy_jigyo values(2019,'04','“d‹C',       '0','“d‹C',null,null,null);
insert into analy_jigyo values(2019,'05','ƒKƒX',       '0','ƒKƒX',null,null,null);
insert into analy_jigyo values(2019,'06','•a‰@',       '0','•a‰@',null,null,null);
insert into analy_jigyo values(2019,'17','‰º…“¹1',    '1','Œö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2019,'17','‰º…“¹1',    '2','“Á’èŒö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2019,'17','‰º…“¹1',    '3','—¬ˆæ‰º…“¹',null,null,null);
insert into analy_jigyo values(2019,'17','‰º…“¹1',    '4','“Á’èŠÂ‹«‰º…“¹',null,null,null);
insert into analy_jigyo values(2019,'17','‰º…“¹1',    '5','”_‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2019,'17','‰º…“¹1',    '6','‹™‹ÆW–ñ”r…{İ',null,null,null);
insert into analy_jigyo values(2019,'17','‰º…“¹1',    '7','—Ñ‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2019,'17','‰º…“¹1',    '8','ŠÈˆÕ”r…{İ',null,null,null);
insert into analy_jigyo values(2019,'17','‰º…“¹1',    '9','¬‹K–Í”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2019,'18','‰º…“¹2',    '0','“Á’è”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2019,'18','‰º…“¹2',    '1','ŒÂ•Ê”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2019,'08','`˜p',       '0','`˜p',null,null,null);
insert into analy_jigyo values(2019,'09','sê',       '0','sê',null,null,null);
insert into analy_jigyo values(2019,'10','‚Æ’{ê',     '0','‚Æ’{ê',null,null,null);
insert into analy_jigyo values(2019,'11','ŠÏŒõ',       '1','‹x—{h”‘',null,null,null);
insert into analy_jigyo values(2019,'11','ŠÏŒõ',       '2','õ“¹',null,null,null);
insert into analy_jigyo values(2019,'11','ŠÏŒõ',       '3','‚»‚Ì‘¼ŠÏŒõ',null,null,null);
insert into analy_jigyo values(2019,'12','‘î‘¢',       '1','—ÕŠC“y’n‘¢¬',null,null,null);
insert into analy_jigyo values(2019,'12','‘î‘¢',       '2','‚»‚Ì‘¼‘¢¬',null,null,null);
insert into analy_jigyo values(2019,'13','“¹˜H',       '0','—L—¿“¹˜H',null,null,null);
insert into analy_jigyo values(2019,'14','’“Ôê',     '0','’“Ôê',null,null,null);
insert into analy_jigyo values(2019,'15','‚»‚Ì‘¼',     '0','‚»‚Ì‘¼',null,null,null);
insert into analy_jigyo values(2019,'16','‰îŒì',       '0','‰îŒìƒT[ƒrƒX',null,null,null);

commit;


insert into analy_jigyo values(2018,'01','…“¹',       '0','ã…“¹',null,null,null);
insert into analy_jigyo values(2018,'01','…“¹',       '1','ŠÈˆÕ…“¹',null,null,null);
insert into analy_jigyo values(2018,'02','…“¹',       '2','H‹Æ—p…“¹',null,null,null);
insert into analy_jigyo values(2018,'03','Œğ’Ê',       '1','˜H–Ê“dÔ',null,null,null);
insert into analy_jigyo values(2018,'03','Œğ’Ê',       '3','©“®Ô‰^‘—',null,null,null);
insert into analy_jigyo values(2018,'03','Œğ’Ê',       '5','“ss‚‘¬“S“¹',null,null,null);
insert into analy_jigyo values(2018,'03','Œğ’Ê',       '6','Œœ‚“dÔ“™',null,null,null);
insert into analy_jigyo values(2018,'03','Œğ’Ê',       '7','‘D”•‰^q',null,null,null);
insert into analy_jigyo values(2018,'04','“d‹C',       '0','“d‹C',null,null,null);
insert into analy_jigyo values(2018,'05','ƒKƒX',       '0','ƒKƒX',null,null,null);
insert into analy_jigyo values(2018,'06','•a‰@',       '0','•a‰@',null,null,null);
insert into analy_jigyo values(2018,'17','‰º…“¹1',    '1','Œö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2018,'17','‰º…“¹1',    '2','“Á’èŒö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2018,'17','‰º…“¹1',    '3','—¬ˆæ‰º…“¹',null,null,null);
insert into analy_jigyo values(2018,'17','‰º…“¹1',    '4','“Á’èŠÂ‹«‰º…“¹',null,null,null);
insert into analy_jigyo values(2018,'17','‰º…“¹1',    '5','”_‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2018,'17','‰º…“¹1',    '6','‹™‹ÆW–ñ”r…{İ',null,null,null);
insert into analy_jigyo values(2018,'17','‰º…“¹1',    '7','—Ñ‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2018,'17','‰º…“¹1',    '8','ŠÈˆÕ”r…{İ',null,null,null);
insert into analy_jigyo values(2018,'17','‰º…“¹1',    '9','¬‹K–Í”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2018,'18','‰º…“¹2',    '0','“Á’è”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2018,'18','‰º…“¹2',    '1','ŒÂ•Ê”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2018,'08','`˜p',       '0','`˜p',null,null,null);
insert into analy_jigyo values(2018,'09','sê',       '0','sê',null,null,null);
insert into analy_jigyo values(2018,'10','‚Æ’{ê',     '0','‚Æ’{ê',null,null,null);
insert into analy_jigyo values(2018,'11','ŠÏŒõ',       '1','‹x—{h”‘',null,null,null);
insert into analy_jigyo values(2018,'11','ŠÏŒõ',       '2','õ“¹',null,null,null);
insert into analy_jigyo values(2018,'11','ŠÏŒõ',       '3','‚»‚Ì‘¼ŠÏŒõ',null,null,null);
insert into analy_jigyo values(2018,'12','‘î‘¢',       '1','—ÕŠC“y’n‘¢¬',null,null,null);
insert into analy_jigyo values(2018,'12','‘î‘¢',       '2','‚»‚Ì‘¼‘¢¬',null,null,null);
insert into analy_jigyo values(2018,'13','“¹˜H',       '0','—L—¿“¹˜H',null,null,null);
insert into analy_jigyo values(2018,'14','’“Ôê',     '0','’“Ôê',null,null,null);
insert into analy_jigyo values(2018,'15','‚»‚Ì‘¼',     '0','‚»‚Ì‘¼',null,null,null);
insert into analy_jigyo values(2018,'16','‰îŒì',       '0','‰îŒìƒT[ƒrƒX',null,null,null);

commit;




insert into analy_jigyo values(2017,'01','…“¹',       '0','ã…“¹',null,null,null);
insert into analy_jigyo values(2017,'01','…“¹',       '1','ŠÈˆÕ…“¹',null,null,null);
insert into analy_jigyo values(2017,'02','…“¹',       '2','H‹Æ—p…“¹',null,null,null);
insert into analy_jigyo values(2017,'03','Œğ’Ê',       '1','˜H–Ê“dÔ',null,null,null);
insert into analy_jigyo values(2017,'03','Œğ’Ê',       '3','©“®Ô‰^‘—',null,null,null);
insert into analy_jigyo values(2017,'03','Œğ’Ê',       '5','“ss‚‘¬“S“¹',null,null,null);
insert into analy_jigyo values(2017,'03','Œğ’Ê',       '6','Œœ‚“dÔ“™',null,null,null);
insert into analy_jigyo values(2017,'03','Œğ’Ê',       '7','‘D”•‰^q',null,null,null);
insert into analy_jigyo values(2017,'04','“d‹C',       '0','“d‹C',null,null,null);
insert into analy_jigyo values(2017,'05','ƒKƒX',       '0','ƒKƒX',null,null,null);
insert into analy_jigyo values(2017,'06','•a‰@',       '0','•a‰@',null,null,null);
insert into analy_jigyo values(2017,'17','‰º…“¹1',    '1','Œö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2017,'17','‰º…“¹1',    '2','“Á’èŒö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2017,'17','‰º…“¹1',    '3','—¬ˆæ‰º…“¹',null,null,null);
insert into analy_jigyo values(2017,'17','‰º…“¹1',    '4','“Á’èŠÂ‹«‰º…“¹',null,null,null);
insert into analy_jigyo values(2017,'17','‰º…“¹1',    '5','”_‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2017,'17','‰º…“¹1',    '6','‹™‹ÆW–ñ”r…{İ',null,null,null);
insert into analy_jigyo values(2017,'17','‰º…“¹1',    '7','—Ñ‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2017,'17','‰º…“¹1',    '8','ŠÈˆÕ”r…{İ',null,null,null);
insert into analy_jigyo values(2017,'17','‰º…“¹1',    '9','¬‹K–Í”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2017,'18','‰º…“¹2',    '0','“Á’è”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2017,'18','‰º…“¹2',    '1','ŒÂ•Ê”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2017,'08','`˜p',       '0','`˜p',null,null,null);
insert into analy_jigyo values(2017,'09','sê',       '0','sê',null,null,null);
insert into analy_jigyo values(2017,'10','‚Æ’{ê',     '0','‚Æ’{ê',null,null,null);
insert into analy_jigyo values(2017,'11','ŠÏŒõ',       '1','‹x—{h”‘',null,null,null);
insert into analy_jigyo values(2017,'11','ŠÏŒõ',       '2','õ“¹',null,null,null);
insert into analy_jigyo values(2017,'11','ŠÏŒõ',       '3','‚»‚Ì‘¼ŠÏŒõ',null,null,null);
insert into analy_jigyo values(2017,'12','‘î‘¢',       '1','—ÕŠC“y’n‘¢¬',null,null,null);
insert into analy_jigyo values(2017,'12','‘î‘¢',       '2','‚»‚Ì‘¼‘¢¬',null,null,null);
insert into analy_jigyo values(2017,'13','“¹˜H',       '0','—L—¿“¹˜H',null,null,null);
insert into analy_jigyo values(2017,'14','’“Ôê',     '0','’“Ôê',null,null,null);
insert into analy_jigyo values(2017,'15','‚»‚Ì‘¼',     '0','‚»‚Ì‘¼',null,null,null);
insert into analy_jigyo values(2017,'16','‰îŒì',       '0','‰îŒìƒT[ƒrƒX',null,null,null);

commit;





insert into analy_jigyo values(2016,'01','…“¹',       '0','ã…“¹',null,null,null);
insert into analy_jigyo values(2016,'01','…“¹',       '1','ŠÈˆÕ…“¹',null,null,null);
insert into analy_jigyo values(2016,'02','…“¹',       '2','H‹Æ—p…“¹',null,null,null);
insert into analy_jigyo values(2016,'03','Œğ’Ê',       '1','˜H–Ê“dÔ',null,null,null);
insert into analy_jigyo values(2016,'03','Œğ’Ê',       '3','©“®Ô‰^‘—',null,null,null);
insert into analy_jigyo values(2016,'03','Œğ’Ê',       '5','“ss‚‘¬“S“¹',null,null,null);
insert into analy_jigyo values(2016,'03','Œğ’Ê',       '6','Œœ‚“dÔ“™',null,null,null);
insert into analy_jigyo values(2016,'03','Œğ’Ê',       '7','‘D”•‰^q',null,null,null);
insert into analy_jigyo values(2016,'04','“d‹C',       '0','“d‹C',null,null,null);
insert into analy_jigyo values(2016,'05','ƒKƒX',       '0','ƒKƒX',null,null,null);
insert into analy_jigyo values(2016,'06','•a‰@',       '0','•a‰@',null,null,null);
insert into analy_jigyo values(2016,'17','‰º…“¹1',    '1','Œö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2016,'17','‰º…“¹1',    '2','“Á’èŒö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2016,'17','‰º…“¹1',    '3','—¬ˆæ‰º…“¹',null,null,null);
insert into analy_jigyo values(2016,'17','‰º…“¹1',    '4','“Á’èŠÂ‹«‰º…“¹',null,null,null);
insert into analy_jigyo values(2016,'17','‰º…“¹1',    '5','”_‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2016,'17','‰º…“¹1',    '6','‹™‹ÆW–ñ”r…{İ',null,null,null);
insert into analy_jigyo values(2016,'17','‰º…“¹1',    '7','—Ñ‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2016,'17','‰º…“¹1',    '8','ŠÈˆÕ”r…{İ',null,null,null);
insert into analy_jigyo values(2016,'17','‰º…“¹1',    '9','¬‹K–Í”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2016,'18','‰º…“¹2',    '0','“Á’è”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2016,'18','‰º…“¹2',    '1','ŒÂ•Ê”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2016,'08','`˜p',       '0','`˜p',null,null,null);
insert into analy_jigyo values(2016,'09','sê',       '0','sê',null,null,null);
insert into analy_jigyo values(2016,'10','‚Æ’{ê',     '0','‚Æ’{ê',null,null,null);
insert into analy_jigyo values(2016,'11','ŠÏŒõ',       '1','‹x—{h”‘',null,null,null);
insert into analy_jigyo values(2016,'11','ŠÏŒõ',       '2','õ“¹',null,null,null);
insert into analy_jigyo values(2016,'11','ŠÏŒõ',       '3','‚»‚Ì‘¼ŠÏŒõ',null,null,null);
insert into analy_jigyo values(2016,'12','‘î‘¢',       '1','—ÕŠC“y’n‘¢¬',null,null,null);
insert into analy_jigyo values(2016,'12','‘î‘¢',       '2','‚»‚Ì‘¼‘¢¬',null,null,null);
insert into analy_jigyo values(2016,'13','“¹˜H',       '0','—L—¿“¹˜H',null,null,null);
insert into analy_jigyo values(2016,'14','’“Ôê',     '0','’“Ôê',null,null,null);
insert into analy_jigyo values(2016,'15','‚»‚Ì‘¼',     '0','‚»‚Ì‘¼',null,null,null);
insert into analy_jigyo values(2016,'16','‰îŒì',       '0','‰îŒìƒT[ƒrƒX',null,null,null);

commit;





insert into analy_jigyo values(2015,'01','…“¹',       '0','ã…“¹',null,null,null);
insert into analy_jigyo values(2015,'01','…“¹',       '1','ŠÈˆÕ…“¹',null,null,null);
insert into analy_jigyo values(2015,'02','…“¹',       '2','H‹Æ—p…“¹',null,null,null);
insert into analy_jigyo values(2015,'03','Œğ’Ê',       '1','˜H–Ê“dÔ',null,null,null);
insert into analy_jigyo values(2015,'03','Œğ’Ê',       '3','©“®Ô‰^‘—',null,null,null);
insert into analy_jigyo values(2015,'03','Œğ’Ê',       '5','“ss‚‘¬“S“¹',null,null,null);
insert into analy_jigyo values(2015,'03','Œğ’Ê',       '6','Œœ‚“dÔ“™',null,null,null);
insert into analy_jigyo values(2015,'03','Œğ’Ê',       '7','‘D”•‰^q',null,null,null);
insert into analy_jigyo values(2015,'04','“d‹C',       '0','“d‹C',null,null,null);
insert into analy_jigyo values(2015,'05','ƒKƒX',       '0','ƒKƒX',null,null,null);
insert into analy_jigyo values(2015,'06','•a‰@',       '0','•a‰@',null,null,null);
insert into analy_jigyo values(2015,'17','‰º…“¹1',    '1','Œö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2015,'17','‰º…“¹1',    '2','“Á’èŒö‹¤‰º…“¹',null,null,null);
insert into analy_jigyo values(2015,'17','‰º…“¹1',    '3','—¬ˆæ‰º…“¹',null,null,null);
insert into analy_jigyo values(2015,'17','‰º…“¹1',    '4','“Á’èŠÂ‹«‰º…“¹',null,null,null);
insert into analy_jigyo values(2015,'17','‰º…“¹1',    '5','”_‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2015,'17','‰º…“¹1',    '6','‹™‹ÆW–ñ”r…{İ',null,null,null);
insert into analy_jigyo values(2015,'17','‰º…“¹1',    '7','—Ñ‹ÆW—”r…{İ',null,null,null);
insert into analy_jigyo values(2015,'17','‰º…“¹1',    '8','ŠÈˆÕ”r…{İ',null,null,null);
insert into analy_jigyo values(2015,'17','‰º…“¹1',    '9','¬‹K–Í”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2015,'18','‰º…“¹2',    '0','“Á’è”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2015,'18','‰º…“¹2',    '1','ŒÂ•Ê”r…ˆ—{İ',null,null,null);
insert into analy_jigyo values(2015,'08','`˜p',       '0','`˜p',null,null,null);
insert into analy_jigyo values(2015,'09','sê',       '0','sê',null,null,null);
insert into analy_jigyo values(2015,'10','‚Æ’{ê',     '0','‚Æ’{ê',null,null,null);
insert into analy_jigyo values(2015,'11','ŠÏŒõ',       '1','‹x—{h”‘',null,null,null);
insert into analy_jigyo values(2015,'11','ŠÏŒõ',       '2','õ“¹',null,null,null);
insert into analy_jigyo values(2015,'11','ŠÏŒõ',       '3','‚»‚Ì‘¼ŠÏŒõ',null,null,null);
insert into analy_jigyo values(2015,'12','‘î‘¢',       '1','—ÕŠC“y’n‘¢¬',null,null,null);
insert into analy_jigyo values(2015,'12','‘î‘¢',       '2','‚»‚Ì‘¼‘¢¬',null,null,null);
insert into analy_jigyo values(2015,'13','“¹˜H',       '0','—L—¿“¹˜H',null,null,null);
insert into analy_jigyo values(2015,'14','’“Ôê',     '0','’“Ôê',null,null,null);
insert into analy_jigyo values(2015,'15','‚»‚Ì‘¼',     '0','‚»‚Ì‘¼',null,null,null);
insert into analy_jigyo values(2015,'16','‰îŒì',       '0','‰îŒìƒT[ƒrƒX',null,null,null);

commit;

