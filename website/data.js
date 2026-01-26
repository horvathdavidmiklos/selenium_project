


var calcConf = Array();

        /*
         4: 100-200 3. kedvezmény kategória
         3: 200-350 2. kedvezmény kategória
         2: 350-600 1 vagy prémium.
         1: 600- Extra kedvezmény kategória
         */
/*
1: 800 < (extra)
2: 400-800 1 kedvezmény kategória
3: < 400  2. kedvezmény kategória
 */


calcConf['piaci'] = {
    kamatok: {


// 20 éves
		7: {
			'4000000_9999999': {
				1: 6.90,
				2: 6.90,
				3: 6.90,
				4: 6.90,
				5: 6.90,
			},
			'10000000_29999999': {
				1: 6.75,
				2: 6.85,
				3: 6.90,
				4: 6.90,
				5: 6.90,
			},
			'30000000': {
				1: 6.65,
				2: 6.75,
				3: 6.90,
				4: 6.90,
				5: 6.90,
			},


		},

		/*
        1: 800 < (extra)
        2: 400-800 1 kedvezmény kategória
        3: < 400  2. kedvezmény kategória
         */
        3: {
			'4000000_9999999': {
				1: 6.89,
				2: 6.89,
				3: 6.89,
				4: 6.89,
				5: 6.89,
			},
			'10000000_29999999': {
				1: 6.64,
				2: 6.74,
				3: 6.89,
				4: 6.89,
				5: 6.89,
			},
			'30000000': {
				1: 6.59,
				2: 6.69,
				3: 6.89,
				4: 6.89,
				5: 6.89,
			},





	},



    },
    dijak:{
		szamlavezetes_hasznalati_koltseg: 325
	},
    koltsegek: {
        ingatlan_nyilvantartasi_eljaras_dija: 20000
    },


},
 /*
         4: 100-200 3. kedvezmény kategória
         3: 200-350 2. kedvezmény kategória
         2: 350-600 1 vagy prémium.
         1: 600- Extra kedvezmény kategória

         */
calcConf['szabad_felh'] = {
   kamatok: {
	   /*
1: 800 < (extra)
2: 400-800 1 kedvezmény kategória
3: < 400  2. kedvezmény kategória
 */
        3: {// 10 éves kamatperiódus
			'4000000_9999999': {
				1: 9.69,
				2: 9.69,
				3: 9.69,
				4: 9.69,
				5: 9.69,
			},
			'10000000_19999999': {
				1: 9.44,
				2: 9.54,
				3: 9.69,
				4: 9.69,
				5: 9.69,
			},
			'20000000': {
				1: 9.19,
				2: 9.44,
				3: 9.69,
				4: 9.69,
				5: 9.69,
			},
        },


    },
    dijak: {
		szamlavezetes_hasznalati_koltseg: 325
	},
    koltsegek: {
        ingatlan_nyilvantartasi_eljaras_dija: 20000
    },


}
