type TAttachPropList = {
    [key: string]: {
        model: string;
        bone: number;
        x: number;
        y: number;
        z: number;
        xr: number;
        yr: number;
        zr: number;
    };
};

export const attachmentPropList: TAttachPropList = {
    cigar1: { model: "prop_cigar_01", bone: 47419, x: 0.01, y: 0.0, z: 0.0, xr: 50.0, yr: -80.0, zr: 0.0 },
    extractionsaw: { model: "prop_tool_consaw", bone: 57005, x: 0.095, y: 0.0, z: 0.0, xr: 125, yr: 155, zr: 55 },
    cigar2: { model: "prop_cigar_02", bone: 47419, x: 0.01, y: 0.0, z: 0.0, xr: 50.0, yr: -80.0, zr: 0.0 },
    cigar3: { model: "prop_cigar_03", bone: 47419, x: 0.01, y: 0.0, z: 0.0, xr: 50.0, yr: -80.0, zr: 0.0 },
    cigarette: { model: "prop_cs_ciggy_01", bone: 28422, x: -0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    cig01: { model: "prop_amb_ciggy_01", bone: 28422, x: -0.024, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    cig02: { model: "prop_amb_ciggy_01", bone: 58867, x: 0.06, y: 0.0, z: -0.02, xr: 0.0, yr: 0.0, zr: 90.0 },
    cigmouth: { model: "prop_amb_ciggy_01", bone: 47419, x: 0.01, y: -0.009, z: -0.003, xr: 55.0, yr: 0.0, zr: 110.0 },
    healthpack01: { model: "prop_ld_health_pack", bone: 28422, x: 0.18, y: 0.0, z: 0.0, xr: 135.0, yr: -100.0, zr: 0.0 },
    briefcase01: { model: "prop_ld_case_01", bone: 28422, x: 0.08, y: 0.0, z: 0.0, xr: 315.0, yr: 288.0, zr: 0.0 },
    cashcase01: { model: "prop_cash_case_01", bone: 28422, x: 0.05, y: 0.0, z: 0.0, xr: 135.0, yr: -100.0, zr: 0.0 },
    cashbag01: { model: "prop_cs_heist_bag_01", bone: 24816, x: 0.15, y: -0.4, z: -0.38, xr: 90.0, yr: 0.0, zr: 0.0 },
    wadofbills: { model: "prop_anim_cash_pile_01", bone: 60309, x: 0.0, y: 0.0, z: 0.0, xr: 180.0, yr: 0.0, zr: 70.0 },
    notepad01: { model: "prop_notepad_01", bone: 60309, x: 0.0, y: -0.0, z: -0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    phone01: { model: "prop_player_phone_01", bone: 57005, x: 0.14, y: 0.01, z: -0.02, xr: 110.0, yr: 120.0, zr: -15.0 },
    radio01: { model: "prop_cs_hand_radio", bone: 57005, x: 0.14, y: 0.01, z: -0.02, xr: 110.0, yr: 120.0, zr: -15.0 },
    clipboard01: { model: "p_amb_clipboard_01", bone: 60309, x: -0.01, y: -0.015, z: 0.005, xr: 0.0, yr: 0.0, zr: -10.0 },
    clipboard02: { model: "p_amb_clipboard_01", bone: 60309, x: 0.1, y: -0.01, z: 0.005, xr: -95.0, yr: 20.0, zr: -20.0 },
    tablet01: { model: "prop_cs_tablet", bone: 60309, x: 0.02, y: -0.01, z: -0.03, xr: 0.0, yr: 0.0, zr: -10.0 },
    pencil01: { model: "prop_pencil_01", bone: 58870, x: 0.04, y: 0.0225, z: 0.08, xr: 320.0, yr: 0.0, zr: 220.0 },
    drugpackage01: { model: "prop_meth_bag_01", bone: 28422, x: 0.1, y: 0.0, z: -0.01, xr: 135.0, yr: -100.0, zr: 40.0 },
    drugpackage02: { model: "prop_weed_bottle", bone: 28422, x: 0.09, y: 0.0, z: -0.03, xr: 135.0, yr: -100.0, zr: 40.0 },
    drugtest01: { model: "prop_cash_case_02", bone: 28422, x: -0.01, y: -0.1, z: -0.138, xr: 0.0, yr: 0.0, zr: 0.0 },
    box01: { model: "prop_cs_cardbox_01", bone: 28422, x: 0.01, y: 0.01, z: 0.0, xr: -255.0, yr: -120.0, zr: 40.0 },
    bomb01: { model: "prop_ld_bomb", bone: 28422, x: 0.22, y: -0.01, z: 0.0, xr: -25.0, yr: -100.0, zr: 0.0 },
    money01: { model: "prop_anim_cash_note", bone: 28422, x: 0.1, y: 0.04, z: 0.0, xr: 25.0, yr: 0.0, zr: 10.0 },
    armor01: { model: "prop_armour_pickup", bone: 28422, x: 0.3, y: 0.01, z: 0.0, xr: 255.0, yr: -90.0, zr: 10.0 },
    terd01: { model: "prop_big_shit_01", bone: 61839, x: 0.015, y: 0.0, z: -0.01, xr: 3.0, yr: -90.0, zr: 180.0 },
    blackduffelbag: { model: "xm_prop_x17_bag_01a", bone: 28422, x: 0.37, y: 0.0, z: 0.0, xr: -50.0, yr: -90.0, zr: 0.0 },
    medicalBag: { model: "xm_prop_x17_bag_med_01a", bone: 28422, x: 0.37, y: 0.0, z: 0.0, xr: -50.0, yr: -90.0, zr: 0.0 },
    securityCase: { model: "prop_security_case_01", bone: 28422, x: 0.1, y: 0.0, z: 0.0, xr: -50.0, yr: -90.0, zr: 0.0 },
    toolbox: { model: "prop_tool_box_04", bone: 28422, x: 0.37, y: 0.0, z: 0.0, xr: -50.0, yr: -90.0, zr: 0.0 },
    boombox01: { model: "prop_boombox_01", bone: 28422, x: 0.2, y: 0.0, z: 0.0, xr: -35.0, yr: -100.0, zr: 0.0 },
    bowlball01: { model: "prop_bowling_ball", bone: 28422, x: 0.12, y: 0.0, z: 0.0, xr: 75.0, yr: 280.0, zr: -80.0 },
    bowlpin01: { model: "prop_bowling_pin", bone: 28422, x: 0.12, y: 0.0, z: 0.0, xr: 75.0, yr: 280.0, zr: -80.0 },
    crate01: { model: "prop_cs_cardbox_01", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    tvcamera01: { model: "prop_v_cam_01", bone: 57005, x: 0.13, y: 0.25, z: -0.03, xr: -85.0, yr: 0.0, zr: -80.0 },
    boomMIKE01: { model: "prop_v_bmike_01", bone: 57005, x: 0.1, y: 0.0, z: -0.03, xr: 85.0, yr: 0.0, zr: 96.0 },
    minigameThermite: { model: "prop_oiltub_06", bone: 57005, x: 0.1, y: 0.0, z: -0.09, xr: 145.0, yr: 20.0, zr: 80.0 },
    minigameDrill: { model: "hei_prop_heist_drill", bone: 57005, x: 0.15, y: 0.0, z: -0.05, xr: 0.0, yr: 90.0, zr: 90.0 },
    news_microphone: { model: "p_ing_microphonel_01", bone: 18905, x: 0.1, y: 0.05, z: 0.0, xr: -85.0, yr: -80.0, zr: -80.0 },
    nosbottle: { model: "p_cs_bottle_01", bone: 18905, x: 0.1, y: 0.05, z: 0.0, xr: -85.0, yr: -80.0, zr: -80.0 },
    newspaper01: { model: "prop_cliff_paper", bone: 28422, x: -0.07, y: 0.0, z: 0.0, xr: 90.0, yr: 0.0, zr: 0.0 },
    golfbag01: { model: "prop_golf_bag_01", bone: 24816, x: 0.12, y: -0.3, z: 0.0, xr: -75.0, yr: 190.0, zr: 92.0 },
    golfputter01: { model: "prop_golf_putter_01", bone: 57005, x: 0.0, y: -0.05, z: 0.0, xr: 90.0, yr: -118.0, zr: 44.0 },
    golfiron01: { model: "prop_golf_iron_01", bone: 57005, x: 0.125, y: 0.04, z: 0.0, xr: 90.0, yr: -118.0, zr: 44.0 },
    golfiron03: { model: "prop_golf_iron_01", bone: 57005, x: 0.126, y: 0.041, z: 0.0, xr: 90.0, yr: -118.0, zr: 44.0 },
    golfiron05: { model: "prop_golf_iron_01", bone: 57005, x: 0.127, y: 0.042, z: 0.0, xr: 90.0, yr: -118.0, zr: 44.0 },
    golfiron07: { model: "prop_golf_iron_01", bone: 57005, x: 0.128, y: 0.043, z: 0.0, xr: 90.0, yr: -118.0, zr: 44.0 },
    golfwedge01: { model: "prop_golf_pitcher_01", bone: 57005, x: 0.17, y: 0.04, z: 0.0, xr: 90.0, yr: -118.0, zr: 44.0 },
    golfdriver01: { model: "prop_golf_driver", bone: 57005, x: 0.14, y: 0.0, z: 0.0, xr: 160.0, yr: -60.0, zr: 10.0 },
    glowstickRight: { model: "ba_prop_battle_glowstick_01", bone: 28422, x: 0.07, y: 0.14, z: 0.0, xr: -80.0, yr: 20.0, zr: 0.0 },
    glowstickLeft: { model: "ba_prop_battle_glowstick_01", bone: 60309, x: 0.07, y: 0.09, z: 0.0, xr: -120.0, yr: 20.0, zr: 0.0 },
    toyHorse: { model: "ba_prop_battle_hobby_horse", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    cup: { model: "prop_plastic_cup_02", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    hamburger: { model: "prop_cs_burger_01", bone: 18905, x: 0.13, y: 0.07, z: 0.02, xr: 120.0, yr: 16.0, zr: 60.0 },
    sandwich: { model: "prop_sandwich_01", bone: 18905, x: 0.13, y: 0.05, z: 0.02, xr: -50.0, yr: 16.0, zr: 60.0 },
    donut: { model: "prop_amb_donut", bone: 18905, x: 0.13, y: 0.05, z: 0.02, xr: -50.0, yr: 16.0, zr: 60.0 },
    water: { model: "prop_ld_flow_bottle", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    coffee: { model: "p_amb_coffeecup_01", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    cola: { model: "prop_ecola_can", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    energydrink: { model: "prop_energy_drink", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    beer: { model: "prop_beer_stzopen", bone: 28422, x: 0.0, y: 0.0, z: -0.15, xr: 0.0, yr: 0.0, zr: 0.0 },
    whiskey: { model: "p_whiskey_bottle_s", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    vodka: { model: "prop_vodka_bottle", bone: 28422, x: 0.0, y: 0.0, z: -0.32, xr: 0.0, yr: 0.0, zr: 0.0 },
    taco: { model: "prop_taco_01", bone: 18905, x: 0.13, y: 0.07, z: 0.02, xr: 160.0, yr: 0.0, zr: -50.0 },
    whiskeyglass: { model: "prop_drink_whisky", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    shotglass: { model: "prop_shots_glass_cs", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    fruit: { model: "ng_proc_food_aple2a", bone: 18905, x: 0.13, y: 0.07, z: 0.02, xr: 160.0, yr: 0.0, zr: 60.0 },
    tennis: { model: "prop_tennis_rack_01", bone: 28422, x: 0.0, y: 0.0, z: 0.0, xr: 0.0, yr: 0.0, zr: 0.0 },
    stolentv: { model: "prop_tv_flat_02", bone: 28422, x: 0.0, y: -0.1, z: 0.1, xr: 0.0, yr: 0.0, zr: 0.0 },
    stolenmusic: { model: "prop_speaker_06", bone: 28422, x: 0.0, y: -0.1, z: 0.0, xr: 30.0, yr: 90.0, zr: 0.0 },
    stolencoffee: { model: "prop_coffee_mac_02", bone: 28422, x: 0.0, y: -0.1, z: -0.08, xr: 0.0, yr: 90.0, zr: 0.0 },
    stolenmicrowave: { model: "prop_micro_02", bone: 28422, x: 0.0, y: -0.1, z: -0.03, xr: 0.0, yr: 0.0, zr: 0.0 },
    stolencomputer: { model: "prop_dyn_pc_02", bone: 28422, x: 0.0, y: -0.1, z: -0.03, xr: 0.0, yr: 90.0, zr: 0.0 },
    stolenart: { model: "hei_prop_hei_bust_01", bone: 28422, x: 0.0, y: -0.3, z: -0.2, xr: 0.0, yr: 0.0, zr: 0.0 },
    trashbag: { model: "prop_cs_street_binbag_01", bone: 57005, x: 0.39, y: -0.22, z: 0.06, xr: 63.0, yr: -126.0, zr: -99.0 },
    police_id_board: { model: "prop_police_id_board", bone: 28422, x: 0, y: 0, z: 0.1, xr: 0.0, yr: 0.0, zr: 0.0 },
    police_badge: { model: "denis3d_policebadge_01", bone: 57005, x: 0.13, y: 0.05, z: -0.06, xr: 40.0, yr: 55.0, zr: -267.0 },
    prop_cs_walking_stick: { model: "prop_cs_walking_stick", bone: 28422, x: 0.06, y: 0.03, z: -0.01, xr: 180.0, yr: 288.0, zr: 0.0 },
    bscoffee: { model: "prop_food_bs_coffee", bone: 28422, x: 0.02, y: 0.01, z: -0.07, xr: 0.0, yr: 0.0, zr: 90.0 },
    softdrink: { model: "prop_food_bs_juice01", bone: 28422, x: 0.01, y: 0.01, z: -0.08, xr: 0.0, yr: 0.0, zr: 180.0 },
    fries: { model: "prop_food_bs_chips", bone: 18905, x: 0.1, y: -0.01, z: 0.05, xr: 0.0, yr: 90.0, zr: 60.0 },
    watercan: { model: "prop_wateringcan", bone: 6286, x: 0.400000274, y: 0.0200000033, z: 0, xr: -52.4197845, yr: -44.8400574, zr: -2.20000029 },
    watercan1: { model: "prop_wateringcan", bone: 57005, x: 0.27, y: 0.0, z: -0.23, xr: -75.0, yr: 41.0, zr: 36.0 },
    fruitbasket: { model: "prop_fruit_basket", bone: 28422, x: 0.22, y: -0.3 + 0.25, z: 0.16, xr: 160.0, yr: 90.0, zr: 125.0 },
    tablet: { model: "prop_cs_tablet", bone: 60309, x: 0.03, y: 0.002, z: -0.0, xr: 10.0, yr: 160.0, zr: 0.0 },
    woodbar: { model: "brevno_work", bone: 28422, x: 0, y: -0.15, z: -0.05, xr: 0, yr: 0, zr: 0 },
    bandage: { model: "prop_gaffer_arm_bind", bone: 36029, x: -0.04, y: 0, z: -0.01, xr: 160, yr: 0, zr: 90 },
    medkit: { model: "prop_ld_health_pack", bone: 36029, x: 0.03, y: 0.01, z: 0.12, xr: 180, yr: -10, zr: 90 },
    hand_tie: { model: "hei_prop_zip_tie_positioned", bone: 6286, x: -0.02, y: 0.063, z: 0, xr: 75.0, yr: 0, zr: 76.0 }
};
