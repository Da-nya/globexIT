with t_main as(
	select col.id as colId, col.name as colName, sub.name as subName, sub.id as subID, age, parent_id
	from collaborators col
	inner join subdivisions sub ON col.subdivision_id = sub.id
),

subdiv_count as (
	select subId, COUNT(colId) as divCount
	from t_main
	group by subId
),

subdiv_levels as (
	select subId, parent_id, 1 as lvl, CONVERT(varchar(128), subId) AS path
	from t_main
	where parent_id IS NULL

	UNION ALL

	select t.subId, t.parent_id, subdiv_levels.lvl + 1, CONVERT(varchar(128), subdiv_levels.path + '/' + CAST(t.subId as varchar))
	from t_main t
	inner join subdiv_levels ON t.parent_id = subdiv_levels.subID
)

select distinct colId as id, colName as name, subName as sub_name, t_m.subId as sub_id, lvl as sub_level, divCount as colls_count
from t_main t_m
inner join subdiv_count s_c ON t_m.subId = s_c.subID
inner join subdiv_levels s_l ON t_m.subID = s_l.subID
where age < 40 AND t_m.subID != 100055 AND t_m.subID != 100059 AND path like (select CAST(subID as varchar) from t_main where colID = 710253) +'/%'
ORDER BY lvl ASC