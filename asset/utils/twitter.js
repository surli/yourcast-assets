/*
*Copyright (c) 2012 YourCast - I3S/CNRS ADAM/INRIA.
*All rights reserved. This program and the accompanying materials
*are made available under the terms of the GNU Public License v3.0
*which accompanies this distribution, and is available at
*http://www.gnu.org/licenses/gpl.html
*
*Contributors:
*    Simon Urli (simon.urli@gmail.com) - Main contributor
*/

function render_date_twitter(date){
	var d = get_date_from_timestamp_int(date);
	return d.day+" "+get_a_month(d.month)+" "+d.year;
}