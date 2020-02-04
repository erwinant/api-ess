"use strict";

module.exports.spCutiBalance =
  "DECLARE	@Balance int, @Quota int, @PeriodeAwal varchar(20), @ExpiredDate varchar(20);  EXEC	[dbo].[sp_GetCutiBalance] :EmployeeId,:TypeCuti,:LastDateCuti, @Balance = @Balance OUTPUT, @Quota = @Quota OUTPUT, @PeriodeAwal = @PeriodeAwal OUTPUT, @ExpiredDate = @ExpiredDate OUTPUT;  SELECT	@Balance as Balance, @Quota as Quota, @PeriodeAwal as PeriodeAwal, @ExpiredDate as ExpiredDate;";
