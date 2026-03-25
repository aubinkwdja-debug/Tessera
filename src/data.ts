export interface Prayer {
  id: string;
  title: string;
  content: string;
  category: 'credo' | 'legion' | 'autre';
  imageUrl?: string;
  audioUrl?: string;
}

export interface Mystery {
  title: string;
  description: string;
  fruit: string;
  scripture?: string;
}

export interface RosaryCategory {
  id: string;
  title: string;
  description: string;
  days: string[];
  mysteries: Mystery[];
}

export const PRAYERS: Prayer[] = [
  {
    id: 'credo-nicee',
    title: 'Nouvelle version de Credo (Symbole de Nicée-Constantinople)',
    category: 'credo',
    content: "Je crois en un seul Dieu, le Père tout-puissant, créateur du ciel et de la terre, de l'univers visible et invisible. Je crois en un seul Seigneur, Jésus Christ, le Fils unique de Dieu, né du Père avant tous les siècles : Il est Dieu, né de Dieu, lumière, née de la lumière, vrai Dieu, né du vrai Dieu. Engendré, non pas créé, de même nature que le Père ; et par lui tout a été fait. Pour nous les hommes, et pour notre salut, il descendit du ciel ; par l'Esprit Saint, il a pris chair de la Vierge Marie, et s'est fait homme. Crucifié pour nous sous Ponce Pilate, il souffrit sa passion et fut mis au tombau. Il ressuscita le troisième jour, conformément aux Écritures, et il monta au ciel ; il est assis à la droite du Père. Il reviendra dans la gloire, pour juger les vivants et les morts ; et son règne n'aura pas de fin. Je crois en l'Esprit Saint, qui est Seigneur et qui donne la vie ; il procède du Père et du Fils. Avec le Père et le Fils, il reçoit même adoration et même gloire ; il a parlé par les prophètes. Je crois en l'Église, une, sainte, catholique et apostolique. Je reconnais un seul baptême pour le pardon des péchés. J'attends la résurrection des morts, et la vie du monde à venir. Amen."
  },
  {
    id: 'litanie-saints',
    title: 'Litanie des Saints',
    category: 'credo',
    content: "Seigneur, aie pitié de nous.\nJésus-Christ, aie pitié de nous.\nSeigneur, aie pitié de nous.\nJésus-Christ, écoute-nous.\nJésus-Christ, exauce-nous.\nPère du ciel, qui es Dieu, aie pitié de nous.\nFils, Rédempteur du monde, qui es Dieu, aie pitié de nous.\nEsprit Saint, qui es Dieu, aie pitié de nous.\nSainte Trinité, qui es un seul Dieu, aie pitié de nous.\nSainte Marie, priez pour nous.\nSainte Mère de Dieu, priez pour nous.\nSainte Vierge des vierges, priez pour nous.\nSaint Michel, Saint Gabriel, Saint Raphaël, priez pour nous.\nTous les saints Anges et Archanges, priez pour nous.\nSaint Jean-Baptiste, priez pour nous.\nSaint Joseph, priez pour nous.\nTous les saints Patriarches et Prophètes, priez pour nous.\nSaint Pierre et Saint Paul, priez pour nous.\nTous les saints Apôtres et Évangélistes, priez pour nous.\nTous les saints Disciples du Seigneur, priez pour nous.\nSaint Étienne, priez pour nous.\nSaint Laurent, priez pour nous.\nSaint Vincent, priez pour nous.\nTous les saints Martyrs, priez pour nous.\nSaint Grégoire, Saint Augustin, Saint Jérôme, Saint Ambroise, priez pour nous.\nTous les saints Évêques et Confesseurs, priez pour nous.\nTous les saints Docteurs, priez pour nous.\nSaint Antoine, Saint Benoît, Saint Bernard, Saint Dominique, Saint François, priez pour nous.\nTous les saints Prêtres et Lévites, priez pour nous.\nTous les saints Moines et Ermites, priez pour nous.\nSainte Marie-Madeleine, Sainte Agathe, Sainte Lucie, Sainte Agnès, Sainte Cécile, Sainte Catherine, Sainte Anastasie, priez pour nous.\nToutes les saintes Vierges et Veuves, priez pour nous.\nTous les Saints et Saintes de Dieu, priez pour nous.\nSoyez-nous propice, pardonnez-nous, Seigneur.\nSoyez-nous propice, exaucez-nous, Seigneur.\nDe tout mal, délivrez-nous, Seigneur.\nDe tout péché, délivrez-nous, Seigneur.\nDe votre colère, délivrez-nous, Seigneur.\nD'une mort subite et imprévue, délivrez-nous, Seigneur.\nDes embûches du démon, délivrez-nous, Seigneur.\nDe la colère, de la haine et de toute mauvaise volonté, délivrez-nous, Seigneur.\nDe l'esprit de fornication, délivrez-nous, Seigneur.\nDe la foudre et de la tempête, délivrez-nous, Seigneur.\nDu fléau des tremblements de terre, délivrez-nous, Seigneur.\nDe la peste, de la famine et de la guerre, délivrez-nous, Seigneur.\nDe la mort éternelle, délivrez-nous, Seigneur.\nPar le mystère de votre sainte incarnation, délivrez-nous, Seigneur.\nPar votre avènement, délivrez-nous, Seigneur.\nPar votre nativité, délivrez-nous, Seigneur.\nPar votre baptême et votre saint jeûne, délivrez-nous, Seigneur.\nPar votre croix et votre passion, délivrez-nous, Seigneur.\nPar votre mort et votre sépulture, délivrez-nous, Seigneur.\nPar votre sainte résurrection, délivrez-nous, Seigneur.\nPar votre admirable ascension, délivrez-nous, Seigneur.\nPar la venue du Saint-Esprit Consolateur, délivrez-nous, Seigneur.\nAu jour du jugement, délivrez-nous, Seigneur.\nPécheurs, nous vous en prions, écoutez-nous.\nDaignez nous pardonner, nous vous en prions, écoutez-nous.\nDaignez nous conduire à une véritable pénitence, nous vous en prions, écoutez-nous.\nDaignez gouverner et conserver votre sainte Église, nous vous en prions, écoutez-nous.\nDaignez maintenir dans votre sainte religion le Souverain Pontife et tous les ordres de la hiérarchie ecclésiastique, nous vous en prions, écoutez-nous.\nDaignez humilier les ennemis de la sainte Église, nous vous en prions, écoutez-nous.\nDaignez accorder aux rois et aux princes chrétiens la paix et une véritable concorde, nous vous en prions, écoutez-nous.\nDaignez accorder à tout le peuple chrétien la paix et l'unité, nous vous en prions, écoutez-nous.\nDaignez rappeler à l'unité de l'Église tous ceux qui sont dans l'erreur, et conduire à la lumière de l'Évangile tous les infidèles, nous vous en prions, écoutez-nous.\nDaignez nous fortifier et nous conserver dans votre saint service, nous vous en prions, écoutez-nous.\nDaignez élever nos esprits aux désirs des choses célestes, nous vous en prions, écoutez-nous.\nDaignez rendre à tous nos bienfaiteurs la récompense des biens éternels, nous vous en prions, écoutez-nous.\nDaignez délivrer de la damnation éternelle nos âmes, celles de nos frères, de nos parents et de nos bienfaiteurs, nous vous en prions, écoutez-nous.\nDaignez donner et conserver les fruits de la terre, nous vous en prions, écoutez-nous.\nDaignez accorder à tous les fidèles trépassés le repos éternel, nous vous en prions, écoutez-nous.\nDaignez nous exaucer, Fils de Dieu, nous vous en prions, écoutez-nous.\nAgneau de Dieu, qui effacez les péchés du monde, pardonnez-nous, Seigneur.\nAgneau de Dieu, qui effacez les péchés du monde, exaucez-nous, Seigneur.\nAgneau de Dieu, qui effacez les péchés du monde, aie pitié de nous.\nChrist, écoute-nous.\nChrist, exauce-nous.\nSeigneur, aie pitié de nous.\nChrist, aie pitié de nous.\nSeigneur, aie pitié de nous."
  },
  {
    id: 'litanie-vierge',
    title: 'Litanie de la Vierge Marie (Litanies de Lorette)',
    category: 'credo',
    content: "Seigneur, aie pitié de nous.\nJésus-Christ, aie pitié de nous.\nSeigneur, aie pitié de nous.\nJésus-Christ, écoute-nous.\nJésus-Christ, exauce-nous.\nPère du ciel, qui es Dieu, aie pitié de nous.\nFils, Rédempteur du monde, qui es Dieu, aie pitié de nous.\nEsprit Saint, qui es Dieu, aie pitié de nous.\nSainte Trinité, qui es un seul Dieu, aie pitié de nous.\nSainte Marie, priez pour nous.\nSainte Mère de Dieu, priez pour nous.\nSainte Vierge des vierges, priez pour nous.\nMère du Christ, priez pour nous.\nMère de l'Église, priez pour nous.\nMère de la miséricorde, priez pour nous.\nMère de la divine grâce, priez pour nous.\nMère de l'espérance, priez pour nous.\nMère très pure, priez pour nous.\nMère très chaste, priez pour nous.\nMère toujours vierge, priez pour nous.\nMère sans tache, priez pour nous.\nMère aimable, priez pour nous.\nMère admirable, priez pour nous.\nMère du bon conseil, priez pour nous.\nMère du Créateur, priez pour nous.\nMère du Sauveur, priez pour nous.\nVierge très prudente, priez pour nous.\nVierge vénérable, priez pour nous.\nVierge digne de louange, priez pour nous.\nVierge puissante, priez pour nous.\nVierge clémente, priez pour nous.\nVierge fidèle, priez pour nous.\nMiroir de justice, priez pour nous.\nSiège de la sagesse, priez pour nous.\nCause de notre joie, priez pour nous.\nVase spirituel, priez pour nous.\nVase d'honneur, priez pour nous.\nVase insigne de dévotion, priez pour nous.\nRose mystique, priez pour nous.\nTour de David, priez pour nous.\nTour d'ivoire, priez pour nous.\nMaison d'or, priez pour nous.\nArche d'alliance, priez pour nous.\nPorte du ciel, priez pour nous.\nÉtoile du matin, priez pour nous.\nSalut des infirmes, priez pour nous.\nRefuge des pécheurs, priez pour nous.\nConsolatrice des affligés, priez pour nous.\nSecours des chrétiens, priez pour nous.\nReine des Anges, priez pour nous.\nReine des Patriarches, priez pour nous.\nReine des Prophètes, priez pour nous.\nReine des Apôtres, priez pour nous.\nReine des Martyrs, priez pour nous.\nReine des Confesseurs, priez pour nous.\nReine des Vierges, priez pour nous.\nReine de tous les Saints, priez pour nous.\nReine conçue sans le péché originel, priez pour nous.\nReine élevée aux cieux, priez pour nous.\nReine du très saint Rosaire, priez pour nous.\nReine de la famille, priez pour nous.\nReine de la paix, priez pour nous.\nAgneau de Dieu, qui effacez les péchés du monde, pardonnez-nous, Seigneur.\nAgneau de Dieu, qui effacez les péchés du monde, exaucez-nous, Seigneur.\nAgneau de Dieu, qui effacez les péchés du monde, aie pitié de nous.\nV. Priez pour nous, sainte Mère de Dieu.\nR. Afin que nous devenions dignes des promesses de Jésus-Christ.\nPrions : Seigneur, daigne répandre ta grâce en nos cœurs ; par le message de l'Ange, tu nous as fait connaître l'incarnation de ton Fils bien-aimé, conduis-nous, par sa passion et par sa croix, jusqu'à la gloire de la résurrection. Par le même Jésus, le Christ, notre Seigneur. Amen."
  },
  {
    id: 'notre-pere',
    title: 'Notre Père',
    category: 'credo',
    content: "Notre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour. Pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés. Et ne nous laisse pas entrer en tentation, mais délivre-nous du Mal. Amen."
  },
  {
    id: 'je-vous-salue-marie',
    title: 'Je vous salue Marie',
    category: 'credo',
    content: "Je vous salue, Marie pleine de grâce ; le Seigneur est avec vous. Vous êtes bénie entre toutes les femmes et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous pauvres pécheurs, maintenant et à l'heure de notre mort. Amen."
  },
  {
    id: 'credo',
    title: 'Credo (Symbole des Apôtres)',
    category: 'credo',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-195fe5772df8?q=60&w=800&auto=format&fit=crop',
    content: "Je crois en Dieu, le Père tout-puissant, Créateur du ciel et de la terre. Et en Jésus Christ, son Fils unique, notre Seigneur ; qui a été conçu du Saint Esprit, est né de la Vierge Marie, a souffert sous Ponce Pilate, a été crucifié, est mort et a été enseveli, est descendu aux enfers ; le troisième jour est ressuscité des morts, est monté aux cieux, est assis à la droite de Dieu le Père tout-puissant, d'où il viendra juger les vivants et les morts. Je crois en l'Esprit Saint, à la sainte Église catholique, à la communion des saints, à la rémission des péchés, à la résurrection de la chair, à la vie éternelle. Amen."
  },
  {
    id: 'prière-st-michel',
    title: 'Prière à Saint Michel',
    category: 'autre',
    content: "Saint Michel Archange, défendez-nous dans le combat ; soyez notre secours contre la malice et les embûches du démon. Que Dieu lui commande, nous vous en supplions ; et vous, Prince de la milice céleste, repoussez en enfer, par la puissance divine, Satan et les autres esprits mauvais qui rôdent dans le monde pour la perte des âmes. Amen."
  },
  {
    id: 'acte-contrition',
    title: 'Acte de Contrition',
    category: 'autre',
    content: "Mon Dieu, j'ai un très grand regret de vous avoir offensé, parce que vous êtes infiniment bon, infiniment aimable, et que le péché vous déplaît. Je prends la ferme résolution, avec le secours de votre sainte grâce, de ne plus vous offenser et de faire pénitence."
  },
  {
    id: 'acte-foi',
    title: 'Acte de Foi',
    category: 'autre',
    content: "Mon Dieu, je crois fermement toutes les vérités que vous avez révélées et que la Sainte Église nous propose à croire, parce que vous êtes la vérité même et que vous ne pouvez ni vous tromper ni nous tromper."
  },
  {
    id: 'acte-charite',
    title: 'Acte de Charité',
    category: 'autre',
    content: "Mon Dieu, je vous aime de tout mon cœur et par-dessus toutes choses, parce que vous êtes infiniment bon et infiniment aimable ; et j'aime mon prochain comme moi-même pour l'amour de vous."
  },
  {
    id: 'acte-esperance',
    title: "Acte d'Espérance",
    category: 'autre',
    content: "Mon Dieu, j'espère avec une ferme confiance que vous me donnerez, par les mérites de Jésus-Christ, votre grâce en ce monde et, si je garde vos commandements, le bonheur éternel dans l'autre, parce que vous l'avez promis et que vous êtes souverainement fidèle à vos promesses."
  },
  {
    id: 'legion-ouverture',
    title: "Prières d'Ouverture (Légion)",
    category: 'legion',
    content: "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.\n\nVenez, Esprit-Saint, remplissez les cœurs de vos fidèles, et allumez en eux le feu de votre amour.\nV. Envoyez votre Esprit, et ils seront créés.\nR. Et vous renouvellerez la face de la terre.\n\nPrions : Ô Dieu, qui avez instruit les cœurs de vos fidèles par la lumière du Saint-Esprit, donnez-nous, par ce même Esprit, de goûter ce qui est bien et de jouir sans cesse de ses divines consolations. Par Jésus-Christ, Notre-Seigneur. Amen.\n\nV. Seigneur, ouvrez mes lèvres.\nR. Et ma bouche annoncera votre louange.\nV. Mon Dieu, venez à mon aide.\nR. Seigneur, hâtez-vous de me secourir.\n\nGloire au Père, et au Fils, et au Saint-Esprit. Comme il était au commencement, maintenant et toujours, et dans les siècles des siècles. Amen."
  },
  {
    id: 'legion-catena',
    title: "Catena Legionis",
    category: 'legion',
    content: "Antienne : Quelle est celle qui s'avance comme l'aurore, belle comme la lune, éclatante comme le soleil, terrible comme une armée rangée en bataille ?\n\nMon âme exalte le Seigneur, exulte mon esprit en Dieu, mon Sauveur !\nIl s'est penché sur son humble servante ; désormais tous les âges me diront bienheureuse.\nLe Puissant fit pour moi des merveilles ; Saint est son nom !\nSa miséricorde s'étend d'âge en âge sur ceux qui le craignent.\nDéployant la force de son bras, il disperse les superbes.\nIl renverse les puissants de leurs trônes, il élève les humbles.\nIl comble de biens les affamés, renvoie les riches les mains vides.\nIl relève Israël son serviteur, il se souvient de son amour,\nde la promesse faite à nos pères, en faveur d'Abraham et de sa race, à jamais.\n\nGloire au Père, et au Fils, et au Saint-Esprit. Comme il était au commencement, maintenant et toujours, et dans les siècles des siècles. Amen.\n\nAntienne : Quelle est celle qui s'avance comme l'aurore, belle comme la lune, éclatante comme le soleil, terrible comme une armée rangée en bataille ?\n\nV. Ô Marie conçue sans péché.\nR. Priez pour nous qui avons recours à vous.\n\nPrions : Seigneur Jésus-Christ, notre Médiateur auprès du Père, qui avez voulu constituer la Très Sainte Vierge, votre Mère, notre Mère aussi et notre Médiatrice auprès de vous, accordez à tous ceux qui vous demandent vos bienfaits la joie de les obtenir tous par elle. Amen."
  },
  {
    id: 'legion-finales',
    title: "Prières Finales (Légion)",
    category: 'legion',
    content: "Sous votre protection nous nous réfugions, Sainte Mère de Dieu ; ne méprisez pas nos prières dans nos besoins, mais délivrez-nous toujours de tous les dangers, Vierge glorieuse et bénie.\n\nV. Marie Immaculée, Médiatrice de toutes grâces.\nR. Priez pour nous.\nV. Saint Michel et Saint Gabriel.\nR. Priez pour nous.\nV. Puissances célestes, Légion des Anges de Marie.\nR. Priez pour nous.\nV. Saint Jean-Baptiste.\nR. Priez pour nous.\nV. Saints Pierre et Paul.\nR. Priez pour nous.\n\nPrions : Seigneur, accordez-nous, à nous qui servons sous l'étendard de Marie, cette plénitude de foi en vous et de confiance en elle, qui est assurée de vaincre le monde. Donnez-nous une foi vive, animée par la charité, qui nous rende capables d'accomplir toutes nos actions par le seul amour de vous, et de vous voir et de vous servir toujours dans notre prochain ; une foi ferme et inébranlable comme un rocher, par laquelle nous demeurerons calmes et constants au milieu des croix, des labeurs et des déceptions de la vie ; une foi courageuse qui nous pousse à entreprendre et à poursuivre sans hésitation de grandes choses pour Dieu et pour le salut des âmes ; une foi qui soit la Colonne de Feu de notre Légion, pour nous conduire unis dans notre marche, pour allumer partout le feu de l'amour divin, pour éclairer ceux qui sont dans les ténèbres et dans l'ombre de la mort, pour embraser les tièdes, pour rendre la vie à ceux qui sont morts par le péché ; une foi qui guide nos pas dans le chemin de la paix, afin qu'après les luttes de cette vie, notre Légion puisse se réunir, sans la perte d'un seul membre, dans le royaume de votre amour et de votre gloire. Amen.\n\nQue les âmes de nos légionnaires décédés et les âmes de tous les fidèles trépassés reposent en paix par la miséricorde de Dieu. Amen.\n\nAu nom du Père, et du Fils, et du Saint-Esprit. Amen."
  },
  {
    id: 'priere-paix-ci',
    title: "Prière pour la Paix en Côte d'Ivoire",
    category: 'autre',
    content: "Seigneur Jésus, Prince de la Paix, nous te confions notre cher pays, la Côte d’Ivoire. Regarde avec bonté tous ses habitants. Accorde-nous la grâce d'une paix véritable et durable, fondée sur la justice et l'amour fraternel.\n\nÉloigne de nous l'esprit de division, de haine et de vengeance. Apprends-nous à nous pardonner mutuellement et à travailler ensemble, main dans la main, pour la reconstruction et la prospérité de notre nation.\n\nQue par l’intercession de la Vierge Marie, Notre-Dame de la Paix, patronne de notre pays, nous puissions vivre dans l'harmonie et la concorde, afin que la Côte d'Ivoire soit un modèle de fraternité pour toute l'Afrique et pour le monde. Amen."
  },
  {
    id: 'nd-paix-yamoussoukro',
    title: "Prière à Notre-Dame de la Paix",
    category: 'autre',
    content: "Ô Marie, Reine de la Paix et Mère de l'Église, nous nous tournons vers vous avec confiance. Vous qui avez veillé sur la construction de la Basilique de Yamoussoukro, symbole de notre foi et de notre désir de paix, continuez de protéger la Côte d'Ivoire.\n\nObtenez-nous de votre Fils la paix du cœur, la paix dans nos familles et la paix entre toutes les ethnies et religions de notre pays. Apprenez-nous à être des artisans de paix là où nous vivons, en suivant votre exemple de douceur et d'humilité.\n\nNotre-Dame de la Paix de Yamoussoukro, priez pour nous, priez pour la Côte d'Ivoire, priez pour le monde entier. Amen."
  },
  {
    id: 'evangile-matthieu',
    title: "Évangile selon Saint Matthieu",
    category: 'autre',
    content: "L'Évangile selon Saint Matthieu souligne la royauté de Jésus, le Messie promis. Il s'ouvre sur la généalogie de Jésus et contient le célèbre Sermon sur la Montagne (les Béatitudes).\n\n« Heureux les pauvres de cœur, car le royaume des Cieux est à eux. Heureux ceux qui pleurent, car ils seront consolés. Heureux les doux, car ils recevront la terre en héritage. » (Mt 5, 3-5)"
  },
  {
    id: 'evangile-marc',
    title: "Évangile selon Saint Marc",
    category: 'autre',
    content: "L'Évangile selon Saint Marc est le plus court et met l'accent sur les actions de Jésus comme Serviteur souffrant et Fils de Dieu. Il insiste sur la nécessité de la foi et du service.\n\n« Car le Fils de l'homme n'est pas venu pour être servi, mais pour servir, et donner sa vie en rançon pour la multitude. » (Mc 10, 45)"
  },
  {
    id: 'evangile-luc',
    title: "Évangile selon Saint Luc",
    category: 'autre',
    content: "L'Évangile selon Saint Luc présente Jésus comme le Sauveur compatissant de toute l'humanité, avec une attention particulière pour les pauvres, les pécheurs et les femmes. Il contient les récits de l'enfance et la parabole du Fils prodigue.\n\n« Car le Fils de l'homme est venu chercher et sauver ce qui était perdu. » (Lc 19, 10)"
  },
  {
    id: 'evangile-jean',
    title: "Évangile selon Saint Jean",
    category: 'autre',
    content: "L'Évangile selon Saint Jean est spirituel et théologique, révélant Jésus comme le Verbe fait chair, la Lumière du monde et le Pain de Vie. Il contient les grands discours de Jésus sur l'amour.\n\n« Au commencement était le Verbe, et le Verbe était auprès de Dieu, et le Verbe était Dieu. [...] Et le Verbe s'est fait chair, il a habité parmi nous. » (Jn 1, 1.14)"
  },
  {
    id: 'angelus',
    title: "L'Angélus",
    category: 'autre',
    content: "V. L’ange du Seigneur apporta l’annonce à Marie\nR. Et elle conçut du Saint-Esprit.\nJe vous salue Marie...\n\nV. Voici la servante du Seigneur\nR. Qu’il me soit fait selon votre parole.\nJe vous salue Marie...\n\nV. Et le Verbe s’est fait chair\nR. Et il a habité parmi nous.\nJe vous salue Marie...\n\nV. Priez pour nous, sainte Mère de Dieu\nR. Afin que nous devenions dignes des promesses du Christ.\n\nPrions : Répands, Seigneur, ta grâce dans nos âmes ; par le message de l'ange, tu nous as fait connaître l'incarnation de ton Fils bien-aimé, conduis-nous, par sa passion et par sa croix, jusqu'à la gloire de la résurrection. Par le même Jésus, le Christ, notre Seigneur. Amen."
  },
  {
    id: 'chapelet-divine-misericorde',
    title: "Chapelet de la Divine Miséricorde",
    category: 'autre',
    content: "Au début : Signe de la Croix, Notre Père, Je vous salue Marie, Je crois en Dieu.\n\nSur les gros grains (une fois) :\n« Père Éternel, je T'offre le Corps et le Sang, l'Âme et la Divinité de Ton Fils bien-aimé, notre Seigneur Jésus-Christ, en réparation de nos péchés et de ceux du monde entier. »\n\nSur les petits grains (dix fois) :\n« Par Sa douloureuse Passion, sois miséricordieux pour nous et pour le monde entier. »\n\nÀ la fin (trois fois) :\n« Dieu Saint, Dieu Fort, Dieu Éternel, prends pitié de nous et du monde entier. »\n\nConclusion :\n« Ô Sang et Eau, qui avez jailli du Cœur de Jésus comme source de Miséricorde pour nous, j'ai confiance en Vous ! »"
  },
  {
    id: 'salve-regina',
    title: "Salve Regina",
    category: 'autre',
    content: "Salut, ô Reine, Mère de miséricorde : notre vie, notre douceur et notre espérance, salut ! Enfants d'Ève, malheureux exilés, nous élevons nos cris vers vous ; nous soupirons vers vous, gémissant et pleurant dans cette vallée de larmes. Ô notre avocate, tournez donc vers nous vos regards miséricordieux ; et au sortir de cet exil, montrez-nous Jésus, le fruit béni de vos entrailles, ô clémente, ô miséricordieuse, ô douce Vierge Marie. Amen."
  },
  {
    id: 'souvenez-vous',
    title: "Souvenez-vous (Memorare)",
    category: 'autre',
    content: "Souvenez-vous, ô très miséricordieuse Vierge Marie, qu'on n'a jamais entendu dire qu'aucun de ceux qui ont eu recours à votre protection, imploré votre assistance ou réclamé vos suffrages, ait été abandonné. Animé d'une pareille confiance, ô Vierge des vierges, ô ma Mère, je cours vers vous, et, gémissant sous le poids de mes péchés, je me prosterne à vos pieds. Ô Mère du Verbe incarné, ne méprisez pas mes prières, mais écoutez-les favorablement et daignez les exaucer. Amen."
  },
  {
    id: 'magnificat',
    title: "Magnificat",
    category: 'autre',
    content: "Mon âme exalte le Seigneur, exulte mon esprit en Dieu, mon Sauveur !\nIl s'est penché sur son humble servante ; désormais tous les âges me diront bienheureuse.\nLe Puissant fit pour moi des merveilles ; Saint est son nom !\nSa miséricorde s'étend d'âge en âge sur ceux qui le craignent.\nDéployant la force de son bras, il disperse les superbes.\nIl renverse les puissants de leurs trônes, il élève les humbles.\nIl comble de biens les affamés, renvoie les riches les mains vides.\nIl relève Israël son serviteur, il se souvient de son amour,\nde la promesse faite à nos pères, en faveur d'Abraham et de sa race, à jamais.\n\nGloire au Père, et au Fils, et au Saint-Esprit. Comme il était au commencement, maintenant et toujours, et dans les siècles des siècles. Amen."
  },
];

export const ROSARY: RosaryCategory[] = [
  {
    id: 'joyeux',
    title: 'Mystères Joyeux',
    description: "Ces mystères nous font méditer sur l'enfance de Jésus et la joie de l'Incarnation, nous invitant à accueillir Dieu dans notre quotidien avec un cœur pur et ouvert.",
    days: ['Lundi', 'Samedi'],
    mysteries: [
      { 
        title: "L'Annonciation", 
        description: "L'archange Gabriel est envoyé par Dieu à Nazareth pour annoncer à une humble vierge, Marie, qu'elle a été choisie pour être la Mère du Sauveur. C'est le moment sacré où le Ciel touche la Terre. Marie, dans un acte de foi parfaite et d'abandon total, répond : 'Voici la servante du Seigneur ; qu'il me soit fait selon ta parole'. Par son 'Fiat', elle permet au Verbe de se faire chair pour notre salut.", 
        fruit: "L'humilité profonde, la pureté d'intention et l'obéissance joyeuse à la volonté de Dieu, même quand elle dépasse notre entendement.",
        scripture: "« L'ange entra chez elle et dit : 'Réjouis-toi, comblée de grâce, le Seigneur est avec toi.' » (Lc 1, 28)"
      },
      { 
        title: "La Visitation", 
        description: "Apprenant que sa cousine Élisabeth attend un enfant dans sa vieillesse, Marie, portant déjà Jésus en elle, se hâte vers les montagnes de Judée. Ce n'est pas seulement une visite de courtoisie, mais le premier acte missionnaire : Marie apporte le Christ à sa famille. À son arrivée, Jean-Baptiste tressaille d'allégresse dans le sein de sa mère, et Marie entonne le Magnificat, chantant les merveilles de Dieu.", 
        fruit: "La charité fraternelle active, la délicatesse envers le prochain et la joie de partager la présence de Dieu avec les autres.",
        scripture: "« Élisabeth fut remplie d'Esprit Saint, et s'écria : 'Tu es bénie entre toutes les femmes !' » (Lc 1, 41-42)"
      },
      { 
        title: "La Nativité", 
        description: "Jésus, le Roi de l'Univers, naît dans le dénuement le plus total d'une étable à Bethléem. Marie le dépose avec tendresse dans une crèche. Ce mystère nous révèle que Dieu se fait petit pour nous rejoindre dans notre pauvreté. Les anges annoncent la paix, tandis que les bergers, les plus humbles de la société, sont les premiers témoins de la Lumière qui vient éclairer tout homme.", 
        fruit: "L'esprit de pauvreté évangélique, le détachement des honneurs du monde et l'adoration silencieuse du mystère de Dieu fait homme.",
        scripture: "« Elle mit au monde son fils premier-né ; elle l'emmaillota et le coucha dans une crèche. » (Lc 2, 7)"
      },
      { 
        title: "La Présentation", 
        description: "Quarante jours après la naissance, Marie et Joseph présentent l'Enfant Jésus au Temple pour accomplir la Loi. Le vieillard Siméon, guidé par l'Esprit, reconnaît en cet enfant le Salut du monde. Il prophétise aussi la douleur de Marie : 'Un glaive te transpercera l'âme'. Marie offre son fils au Père, acceptant déjà le sacrifice futur pour la rédemption de l'humanité.", 
        fruit: "La pureté du cœur, l'esprit d'obéissance aux préceptes de l'Église et l'offrande de soi-même à Dieu à travers nos devoirs quotidiens.",
        scripture: "« Mes yeux ont vu le salut que tu préparais à la face des peuples. » (Lc 2, 30-31)"
      },
      { 
        title: "Le Recouvrement", 
        description: "Après trois jours de recherche angoissée à Jérusalem, Marie et Joseph retrouvent Jésus, âgé de douze ans, au milieu des docteurs de la Loi. Il les écoutait et les interrogeait, manifestant une sagesse divine. À Marie qui lui exprime son inquiétude, il répond : 'Ne saviez-vous pas que j'ai à être chez mon Père ?'. Ce mystère nous enseigne que la volonté de Dieu prime sur tout lien humain.", 
        fruit: "La recherche constante de Dieu dans nos vies, la persévérance dans la prière malgré les sécheresses et la docilité à la volonté divine.",
        scripture: "« Ne saviez-vous pas que j'ai à être chez mon Père ? » (Lc 2, 49)"
      }
    ]
  },
  {
    id: 'lumineux',
    title: 'Mystères Lumineux',
    description: "Ces mystères nous font méditer sur la vie publique de Jésus, révélant sa divinité et sa mission de salut comme Lumière du monde.",
    days: ['Jeudi'],
    mysteries: [
      { 
        title: "Le Baptême de Jésus", 
        description: "Jésus, l'Innocent, descend dans les eaux du Jourdain pour recevoir le baptême de Jean, se solidarisant ainsi avec les pécheurs que nous sommes. Au moment où il sort de l'eau, les cieux s'ouvrent, l'Esprit descend comme une colombe et la voix du Père proclame son identité divine. C'est l'investiture solennelle de sa mission messianique.", 
        fruit: "La fidélité renouvelée aux promesses de notre baptême et la conscience profonde de notre dignité d'enfants de Dieu appelés à la sainteté.",
        scripture: "« Dès que Jésus fut baptisé, il vit l'Esprit de Dieu descendre comme une colombe. » (Mt 3, 16)"
      },
      { 
        title: "Les Noces de Cana", 
        description: "Lors d'un mariage, le vin venant à manquer, Marie remarque la détresse des mariés et intercède auprès de son Fils. Bien que son heure ne soit pas encore venue, Jésus change l'eau en vin, manifestant sa gloire. C'est le premier signe de Jésus, accompli par la médiation maternelle de Marie qui nous dit : 'Faites tout ce qu'il vous dira'.", 
        fruit: "La confiance absolue en l'intercession de Marie, l'écoute de sa parole maternelle et l'ouverture aux miracles de la grâce dans nos vies.",
        scripture: "« Sa mère dit à ceux qui servaient : 'Tout ce qu'il vous dira, faites-le.' » (Jn 2, 5)"
      },
      { 
        title: "L'Annonce du Royaume", 
        description: "Jésus parcourt la Galilée, prêchant la Bonne Nouvelle : 'Le temps est accompli, le Royaume de Dieu est proche'. Il appelle chacun à la conversion et à croire à l'Évangile. Par ses paroles de vie, ses guérisons et son pardon aux pécheurs, il manifeste que Dieu veut sauver tout homme et l'inviter à sa table.", 
        fruit: "La conversion sincère et permanente du cœur, le désir de la justice et le zèle pour annoncer l'Évangile par nos actes et nos paroles.",
        scripture: "« Les temps sont accomplis : le règne de Dieu est tout proche. Convertissez-vous. » (Mc 1, 15)"
      },
      { 
        title: "La Transfiguration", 
        description: "Sur le mont Thabor, devant Pierre, Jacques et Jean, le visage de Jésus devient éclatant comme le soleil. Il révèle sa gloire divine pour fortifier ses disciples avant l'épreuve de la Passion. La voix du Père confirme : 'Celui-ci est mon Fils bien-aimé : écoutez-le !'. Ce moment de lumière nous donne un avant-goût de la résurrection.", 
        fruit: "Le désir de la sainteté, la contemplation de la gloire de Dieu pour traverser nos ténèbres et une écoute plus attentive de la Parole du Christ.",
        scripture: "« Son visage devint brillant comme le soleil, et ses vêtements, blancs comme la lumière. » (Mt 17, 2)"
      },
      { 
        title: "L'Institution de l'Eucharistie", 
        description: "Lors de la dernière Cène, Jésus prend le pain et le vin, les bénit et les donne à ses apôtres comme son propre Corps et son propre Sang. Il institue le sacrement de l'Eucharistie, mémorial de son sacrifice et nourriture pour notre voyage terrestre. Il nous laisse ainsi le signe suprême de son amour : il reste avec nous jusqu'à la fin des temps.", 
        fruit: "L'amour profond et l'adoration pour l'Eucharistie, la participation fervente à la Messe et la charité envers nos frères en qui le Christ habite.",
        scripture: "« Ceci est mon corps, donné pour vous. Faites cela en mémoire de moi. » (Lc 22, 19)"
      }
    ]
  },
  {
    id: 'douloureux',
    title: 'Mystères Douloureux',
    description: "Ces mystères nous font méditer sur la passion et la mort de Jésus, nous montrant le prix infini de notre rédemption et l'amour fou de Dieu.",
    days: ['Mardi', 'Vendredi'],
    mysteries: [
      { 
        title: "L'Agonie au Jardin", 
        description: "Au jardin des Oliviers, Jésus ressent l'angoisse mortelle devant la souffrance physique et le poids spirituel des péchés de toute l'humanité. Il lutte dans la prière, acceptant la coupe de la douleur par amour pour nous. Sa sueur de sang témoigne de l'intensité de son combat intérieur pour dire 'Oui' au dessein du Père.", 
        fruit: "La contrition sincère de nos péchés, la force de résister à la tentation et l'acceptation de la volonté de Dieu dans les moments d'obscurité.",
        scripture: "« Père, si tu le veux, éloigne de moi cette coupe ; cependant, que ce ne soit pas ma volonté qui se fasse, mais la tienne. » (Lc 22, 42)"
      },
      { 
        title: "La Flagellation", 
        description: "Jésus est livré aux mains des soldats romains qui le dépouillent et l'attachent à une colonne. Il subit le supplice cruel de la flagellation, son corps étant déchiré par les coups. Il endure cette humiliation et cette douleur indicible pour réparer nos péchés de chair et nos manques de respect envers le corps humain, temple de l'Esprit.", 
        fruit: "La mortification des sens, la maîtrise de nos désirs désordonnés et la patience héroïque dans les souffrances physiques ou morales.",
        scripture: "« Pilate fit alors saisir Jésus pour qu'il soit flagellé. » (Jn 19, 1)"
      },
      { 
        title: "Le Couronnement d'épines", 
        description: "Par dérision, les soldats tressent une couronne d'épines et l'enfoncent sur la tête de Jésus. Ils se moquent de sa royauté, le frappent et lui crachent au visage. Jésus, le Roi de Gloire, accepte ce couronnement de douleur pour racheter nos péchés d'orgueil, nos pensées impures et nos jugements téméraires.", 
        fruit: "L'humilité de l'esprit, le mépris des vaines gloires du monde et la purification de nos pensées pour les tourner vers ce qui est vrai et saint.",
        scripture: "« Les soldats tressèrent une couronne avec des épines, et la lui mirent sur la tête. » (Jn 19, 2)"
      },
      { 
        title: "Le Portement de la Croix", 
        description: "Condamné à mort, Jésus charge sa lourde croix sur ses épaules meurtries. Épuisé, il tombe plusieurs fois sur le chemin du Calvaire, mais se relève à chaque fois, poussé par son amour pour nous. Il rencontre sa Mère, dont la présence silencieuse partage son fardeau. Il nous montre que suivre le Christ implique de porter sa croix.", 
        fruit: "La patience dans les épreuves de la vie, le courage de se relever après nos chutes et l'acceptation de nos limites avec confiance en Dieu.",
        scripture: "« Jésus, portant lui-même sa croix, sortit en direction du lieu dit : Le Crâne (Golgotha). » (Jn 19, 17)"
      },
      { 
        title: "Le Crucifiement", 
        description: "Arrivé au Calvaire, Jésus est cloué sur la croix. Pendant trois heures d'agonie, il prie pour ses bourreaux, promet le paradis au bon larron et nous donne Marie pour Mère. Enfin, après avoir tout accompli, il remet son esprit entre les mains du Père. Par sa mort, il détruit la mort et nous ouvre les portes de la vie éternelle.", 
        fruit: "Un amour sans bornes pour Jésus crucifié, le pardon sincère des offenses et la grâce d'une sainte mort en union avec le sacrifice du Christ.",
        scripture: "« Père, entre tes mains je remets mon esprit. » (Lc 23, 46)"
      }
    ]
  },
  {
    id: 'glorieux',
    title: 'Mystères Glorieux',
    description: "Ces mystères nous font méditer sur la victoire éclatante de Jésus sur la mort et la gloire éternelle qui nous est promise en sa présence.",
    days: ['Mercredi', 'Dimanche'],
    mysteries: [
      { 
        title: "La Résurrection", 
        description: "Le matin de Pâques, le tombeau est vide. Jésus est ressuscité ! Il a vaincu la mort et le péché pour toujours. Il apparaît à Marie-Madeleine et aux apôtres, leur montrant ses plaies glorieuses. Sa résurrection est le fondement de notre foi et la preuve que l'amour est plus fort que la mort. La joie de Pâques inonde le monde.", 
        fruit: "Une foi vive et inébranlable en la présence du Ressuscité, la joie spirituelle et le désir de mener une vie nouvelle selon l'Esprit.",
        scripture: "« Pourquoi cherchez-vous le Vivant parmi les morts ? Il n'est pas ici, il est ressuscité. » (Lc 24, 5-6)"
      },
      { 
        title: "L'Ascension", 
        description: "Quarante jours après sa résurrection, Jésus monte au ciel sous les yeux de ses disciples. Il ne nous abandonne pas, mais s'en va nous préparer une place auprès du Père. Il s'assoit à la droite de Dieu, devenant notre intercesseur permanent. Son départ nous appelle à devenir ses témoins jusqu'aux extrémités de la terre.", 
        fruit: "L'espérance ferme en la vie éternelle, le détachement des choses terrestres et le désir ardent du ciel, notre véritable et seule patrie.",
        scripture: "« Tandis qu'il les bénissait, il se sépara d'eux et fut emporté au ciel. » (Lc 24, 51)"
      },
      { 
        title: "La Pentecôte", 
        description: "Réunis au Cénacle avec Marie, les apôtres reçoivent le Saint-Esprit sous forme de langues de feu. La peur disparaît, laissant place à un courage missionnaire immense. L'Église naît officiellement, envoyée porter la Lumière du Christ à toutes les nations. L'Esprit Saint vient habiter nos cœurs pour nous guider vers la vérité tout entière.", 
        fruit: "Le zèle pour l'apostolat, la docilité aux inspirations de l'Esprit Saint et l'usage de nos talents pour le bien de l'Église et du monde.",
        scripture: "« Tous furent remplis d'Esprit Saint : ils se mirent à parler en d'autres langues. » (Ac 2, 4)"
      },
      { 
        title: "L'Assomption", 
        description: "Au terme de sa vie terrestre, la Vierge Marie est élevée corps et âme dans la gloire céleste par la puissance de Dieu. Elle ne connaît pas la corruption du tombeau. Marie, notre Mère, nous précède dans la gloire, nous montrant la destinée finale de tout homme fidèle à Dieu. Elle est notre signe d'espérance et de consolation.", 
        fruit: "La grâce d'une sainte mort, le respect pour notre corps comme temple de Dieu et une dévotion filiale toujours plus profonde envers Marie.",
        scripture: "« Un signe grandiose apparut au ciel : une Femme, ayant le soleil pour manteau. » (Ap 12, 1)"
      },
      { 
        title: "Le Couronnement de Marie", 
        description: "Marie est couronnée Reine du ciel et de la terre par la Très Sainte Trinité. Elle est la Reine des anges et des saints. Depuis son trône de gloire, elle veille sur nous avec un amour maternel infini, intercédant sans cesse pour ses enfants. Elle nous guide sûrement vers le Royaume de son Fils, Jésus, notre Seigneur.", 
        fruit: "La confiance totale en la protection royale et maternelle de Marie, la persévérance finale dans la grâce et l'imitation de ses vertus.",
        scripture: "« La lune est sous ses pieds, et sur sa tête une couronne de douze étoiles. » (Ap 12, 1)"
      }
    ]
  }
];


export interface LiturgicalEvent {
  date: string; // MM-DD format
  title: string;
  description: string;
  type: 'solemnity' | 'feast' | 'memorial' | 'optional-memorial';
}

export const LITURGICAL_CALENDAR: LiturgicalEvent[] = [
  { date: '01-01', title: 'Sainte Marie, Mère de Dieu', description: 'Solennité célébrant la maternité divine de la Vierge Marie.', type: 'solemnity' },
  { date: '01-06', title: 'Épiphanie du Seigneur', description: 'Manifestation de Jésus aux mages, représentant toutes les nations.', type: 'solemnity' },
  { date: '02-02', title: 'Présentation du Seigneur', description: 'Aussi appelée la Chandeleur, célébrant Jésus comme Lumière du monde.', type: 'feast' },
  { date: '03-19', title: 'Saint Joseph, Époux de Marie', description: 'Patron de l’Église universelle et modèle de père et d’époux.', type: 'solemnity' },
  { date: '03-25', title: 'Annonciation du Seigneur', description: 'Célébration de l’Incarnation du Verbe dans le sein de Marie.', type: 'solemnity' },
  { date: '05-31', title: 'Visitation de la Vierge Marie', description: 'Marie rend visite à sa cousine Élisabeth après l’Annonciation.', type: 'feast' },
  { date: '06-24', title: 'Nativité de Saint Jean-Baptiste', description: 'Célébration de la naissance du précurseur du Seigneur.', type: 'solemnity' },
  { date: '06-29', title: 'Saints Pierre et Paul, Apôtres', description: 'Colonnes de l’Église et martyrs à Rome.', type: 'solemnity' },
  { date: '08-06', title: 'Transfiguration du Seigneur', description: 'Jésus manifeste sa gloire divine sur le mont Thabor.', type: 'feast' },
  { date: '08-15', title: 'Assomption de la Vierge Marie', description: 'Marie est élevée au ciel en corps et en âme.', type: 'solemnity' },
  { date: '09-08', title: 'Nativité de la Vierge Marie', description: 'Célébration de la naissance de la Mère de Dieu.', type: 'feast' },
  { date: '09-14', title: 'La Croix Glorieuse', description: 'Exaltation de la sainte Croix, instrument de notre salut.', type: 'feast' },
  { date: '11-01', title: 'La Toussaint', description: 'Célébration de tous les saints, connus et inconnus.', type: 'solemnity' },
  { date: '11-02', title: 'Commémoration des fidèles défunts', description: 'Prière pour toutes les âmes du purgatoire.', type: 'memorial' },
  { date: '12-08', title: 'Immaculée Conception', description: 'Marie conçue sans péché dès le premier instant de sa vie.', type: 'solemnity' },
  { date: '12-25', title: 'Nativité du Seigneur', description: 'Célébration de la naissance de Jésus à Bethléem.', type: 'solemnity' },
  { date: '03-23', title: 'Saint Turibio de Mogrovejo', description: 'Évêque missionnaire au Pérou, grand défenseur des droits des indigènes.', type: 'memorial' },
  { date: '03-24', title: 'Saint Oscar Romero', description: 'Archevêque de San Salvador, martyr et défenseur de la justice sociale.', type: 'optional-memorial' }
];

export const TESSERA_CONTENT = {
  history: "La Légion de Marie a été fondée à Dublin, en Irlande, le 7 septembre 1921 par Frank Duff. C'est une association de catholiques qui, avec l'approbation de l'Église et sous la puissante protection de Marie Immaculée, Médiatrice de toutes grâces, se sont constitués en Légion pour servir dans la guerre perpétuelle menée par l'Église contre le monde et ses puissances maléfiques.",
  sections: [
    {
      title: "Prières d'Ouverture",
      content: "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.\n(signe de Croix)\nViens, Esprit-Saint, pénètre le cœur de tes fidèles, qu’ils soient brûlés au feu de ton amour.\nV. Ô Seigneur, envoie ton Esprit,\nR. Qui renouvelle la face de la terre.\n\nPrions\nSeigneur, par le mystère de la Pentecôte, tu sanctifies ton Eglise chez tous les peuples et dans toutes les nations : répands les dons du Saint-Esprit sur l’immensité du monde et continue, dans les cœurs des croyants, l’œuvre d’amour que tu as entreprise au début de la prédication évangélique. Par Jésus, le Christ, notre Seigneur. Amen.\n\nV. Seigneur, ouvre mes lèvres !\nR. Et ma bouche publiera ta louange.\nV. Dieu, viens à mon aide.\nR. Seigneur à notre secours !\nV. Gloire au Père, et au Fils, et au Saint-Esprit,\nR. Au Dieu qui est, qui était et qui vient, pour les siècles des siècles. Amen.\n\n(Suivent les cinq dizaines du chapelet)\n\nSalut ô Reine, Mère de miséricorde, notre vie, notre douceur, notre espérance, salut ! Enfants d’Eve, exilés, nous crions vers vous ; vers vous nous soupirons, gémissant et pleurant dans cette vallée de larmes. Ô vous, notre Avocate, tournez vers nous vos regards miséricordieux. Et après cet exil, montrez-nous Jésus, le fruit béni de vos entrailles, ô clémente, ô miséricordieuse, ô douce Vierge Marie !\n\nV. Priez pour nous, sainte Mère de Dieu.\nR. Afin que nous devenions dignes des promesses du Christ.\n\nPrions\nSeigneur notre Dieu, par sa vie, sa mort et sa résurrection, ton Fils nous a procuré le salut éternel ; accorde-nous de conformer notre vie aux mystères du Rosaire que nous méditons et d’obtenir ce qu’ils promettent. Par le même Jésus-Christ Notre Seigneur. Amen.\n\nV. Cœur Sacré de Jésus,\nR. Prends pitié de nous.\n\nV. Cœur Immaculé de Marie,\nR. Priez pour nous.\n\nV. Saint Joseph,\nR. Priez pour nous.\n\nV. Saint Jean l’évangéliste,\nR. Priez pour nous.\n\nV. Saint Louis-Marie de Montfort,\nR. Priez pour nous.\nAu nom de Père, et du Fils, et du Saint-Esprit. Amen.\n(signe de Croix)"
    },
    {
      title: "La Catena Legionis",
      content: "Antienne – Quelle est celle-ci qui s’avance comme l’aurore, belle comme la lune, éclatante comme le soleil, terrible comme une armée rangée en bataille ?\n\nMon âme exalte le Seigneur.\n(signe de Croix)\nExulte mon esprit en Dieu mon Sauveur.\nIl s’est penché sur son humble servante ; désormais tous les âges me diront bienheureuse.\nLe Puissant fit pour moi des merveilles, Saint est son nom.\nSon amour s’étend d’âge en âge sur ceux qui le craignent.\nDéployant la force de son bras, il disperse les superbes.\nIl renverse les puissants de leurs trônes, il élève les humbles.\nIl comble de biens les affamés, renvoie les riches les mains vides.\nIl relève Israël son serviteur, il se souvient de son amour.\nDe la promesse faite à nos pères, en faveur d’Abraham et de sa race à jamais.\nGloire au Père, et au Fils, et au Saint-Esprit,\nAu Dieu qui est, qui était et qui vient, pour les siècles des siècles. Amen.\n\nAntienne – Quelle est celle-ci qui s’avance comme l’aurore, belle comme la lune, éclatante comme le soleil, terrible comme une armée rangée en bataille ?\n\nV. Ô Marie conçue sans péché,\nR. Priez pour nous qui avons recours à vous.\n\nPrions\nSeigneur Jésus-Christ, notre Médiateur auprès du Père, tu as voulu que la Vierge bienheureuse, ta Mère, soit notre Mère et notre Médiatrice auprès de toi, accorde à ceux qui implorent tes faveurs la joie de les recevoir toutes par elle. Amen. Magnificat"
    },
    {
      title: "Prières Finales",
      content: "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.\n(signe de Croix)\nNous avons recours à votre protection, sainte Mère de Dieu. Ne rejetez pas les prières que nous vous adressons dans tous nos besoins, mais délivrez-nous des dangers auxquels nous sommes exposés, ô Vierge comblée de gloire et de bénédiction.\n\nV. Vierge Immaculée, Médiatrice de toutes grâces (ou vocable particulier du groupe),\nR. Priez pour nous.\n\nV. Saint Michel et saint Gabriel,\nR. Priez pour nous.\n\nV. Puissance célestes, Légion d’Anges de Marie,\nR. Priez pour nous.\n\nV. Saint Jean-Baptiste,\nR. Priez pour nous.\n\nV. Saint Pierre et saint Paul,\nR. Priez pour nous.\n\nPrions\nAccorde-nous, Seigneur,\nA nous qui servons sous l’étendard de Marie,\nCette plénitude de foi en toi et de confiance en elle,\nQui sont assurées de vaincre le monde.\nDonne-nous une foi vive et animée par la charité,\nQui nous rende capables d’accomplir toutes nos actions\nPar un motif de pur amour pour toi,\nEt de toujours te voir et te servir dans notre prochain ;\nUne foi ferme et inébranlable comme un rocher,\nPar laquelle nous demeurerons calmes et constants\nAu milieu des croix, des labeurs et des déceptions de la vie ;\nUne foi courageuse qui nous inspire\nD’entreprendre et d’accomplir sans hésitation\nDe grandes choses pour Dieu et pour le salut des âmes ;\nUne foi qui soit la colonne de feu de notre Légion\nPour nous conduire unis dans notre marche en avant\nPour allumer partout les feux de l’amour divin,\nPour éclairer ceux qui sont assis dans les ténèbres et l’ombre de la mort,\nPour enflammer les tièdes,\nPour rappeler à la vie ceux qui sont ensevelis dans la mort du péché ;\nUne foi qui guide nos pas dans le chemin de la paix\nAfin qu’après les luttes de cette vie,\nEt sans déplorer la perte d’un seul membre,\nNotre Légion puisse se rassembler\nDans le royaume de ton amour et de ta gloire.\nAmen.\n\nQue les âmes de nos Légionnaires décédés et les âmes de tous les fidèles trépassés reposent en paix par la miséricorde de Dieu. Amen.\n\nAu nom du Père, et du Fils, et du Saint-Esprit. Amen.\n(signe de Croix)\n(Si un prêtre est présent, il donne la bénédiction)"
    },
    {
      title: "Prière pour la Béatification de Frank Duff",
      content: "Dieu notre Père,\nVous avez accordé à votre serviteur Frank Duff une pénétration profonde du mystère de votre Eglise, corps du Christ, et de la place de Marie, Mère de Jésus, dans le plan de Dieu.\n\nDans son immense désir de faire partager aux autres sa croyance et dans une filiale dépendance envers Marie, il forma la Légion afin qu'elle soit un signe de son amour maternel pour chacun, et un moyen d'engager tous ses enfants dans l'évangélisation du monde.\n\nNous vous remercions, Père, pour les grâces que vous lui avez accordées et pour les avantages acquis à l'Eglise par sa foi courageuse et rayonnante.\n\nAvec confiance, nous vous supplions de nous accorder, par son intercession, la demande que nous déposons devant vous...\n\nNous vous demandons aussi, si telle est votre volonté, de faire reconnaître par l'Eglise la sainteté de sa vie pour la gloire de votre Saint Nom.\n\nPar le Christ Notre Seigneur,\nAmen"
    },
    {
      title: "Adaptation Côte d'Ivoire",
      content: "En Côte d'Ivoire, la Légion de Marie est très active et dévouée à Notre-Dame de la Paix, patronne de la nation. Les légionnaires ivoiriens sont invités à inclure ces intentions dans leurs prières :\n\n1. Pour la paix et la réconciliation nationale en Côte d'Ivoire.\n2. Pour les familles ivoiriennes, afin qu'elles soient des foyers de foi et d'amour.\n3. Pour la jeunesse ivoirienne, qu'elle trouve en Marie un modèle de pureté et de service.\n4. Par l'intercession de Notre-Dame de la Paix de Yamoussoukro, que le Seigneur bénisse notre pays."
    },
    {
      title: "Prière à Frank Duff",
      content: "Seigneur, Père de toute miséricorde, nous te rendons grâce pour le don de ton serviteur Frank Duff, fondateur de la Légion de Marie. Par son exemple de foi ardente, d'amour profond pour Toi et pour ta Mère Immaculée, et par son dévouement à la sanctification des laïcs, aide-nous à vivre notre baptême avec plus de courage et de zèle. Que par son intercession, nous soyons rendus dignes d'être tes fidèles légionnaires, pour la gloire de ton Nom et le salut du monde. Amen."
    }
  ]
};

export const VEXILLUM_INFO = {
  title: "Le Vexillum Legionis",
  image: "https://philadelphiasenatus.org/wp-content/uploads/Vexillini.png",
  history: "Le Vexillum Legionis est l'étendard de la Légion de Marie. Il a été conçu par James Monroe, membre du premier praesidium. Son dessin est calqué sur le Vexillum de la Légion romaine, mais transformé pour exprimer une armée spirituelle.",
  symbolism: [
    {
      item: "Le Saint-Esprit",
      description: "Au sommet se trouve le Saint-Esprit sous la forme d'une colombe, montrant que c'est Lui qui anime et guide la Légion."
    },
    {
      item: "Marie (Médaille Miraculeuse)",
      description: "Sous la colombe se trouve un cadre ovale contenant une représentation de l'Immaculée Conception (la Médaille Miraculeuse), signifiant que Marie est le canal par lequel l'Esprit agit."
    },
    {
      item: "Legio Mariae",
      description: "L'inscription sur la barre transversale identifie l'armée de Marie."
    },
    {
      item: "Le Globe",
      description: "La hampe repose sur un globe, symbolisant le monde entier que la Légion cherche à conquérir pour le Christ par Marie."
    }
  ],
  detailedDescription: "Le Vexillum exprime l'idée que le monde doit être conquis par le Saint-Esprit agissant par Marie et ses enfants. Il est utilisé lors des réunions et des cérémonies officielles comme l'Acies. Il rappelle aux légionnaires leur devoir de loyauté et de service sous l'étendard de leur Reine."
};
