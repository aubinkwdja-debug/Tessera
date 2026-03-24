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
    content: "Mon âme exalte le Seigneur, exulte mon esprit en Dieu, mon Sauveur !\nIl s'est penché sur son humble servante ; désormais tous les âges me diront bienheureuse.\nLe Puissant fit pour moi des merveilles ; Saint est son nom !\nSa miséricorde s'étend d'âge en âge sur ceux qui le craignent.\nDéployant la force de son bras, il disperse les superbes.\nIl renverse les puissants de leurs trônes, il élève les humbles.\nIl comble de biens les affamés, renvoie les riches les mains vides.\nIl relève Israël son serviteur, il se souvient de son amour,\nde la promesse faite à nos pères, en faveur d'Abraham et de sa race, à jamais."
  }
];

export const ROSARY: RosaryCategory[] = [
  {
    id: 'joyeux',
    title: 'Mystères Joyeux',
    description: "Ces mystères nous font méditer sur l'enfance de Jésus et la joie de l'Incarnation, nous invitant à accueillir Dieu dans notre quotidien.",
    days: ['Lundi', 'Samedi'],
    mysteries: [
      { 
        title: "L'Annonciation", 
        description: "L'archange Gabriel est envoyé par Dieu à Nazareth pour annoncer à Marie qu'elle a été choisie pour être la Mère du Sauveur. Marie, dans un acte de foi parfaite, répond : 'Voici la servante du Seigneur ; qu'il me soit fait selon ta parole'.", 
        fruit: "L'humilité profonde et l'obéissance totale à la volonté de Dieu.",
        scripture: "« L'ange entra chez elle et dit : 'Réjouis-toi, comblée de grâce, le Seigneur est avec toi.' » (Lc 1, 28)"
      },
      { 
        title: "La Visitation", 
        description: "Apprenant que sa cousine Élisabeth attend un enfant dans sa vieillesse, Marie se hâte vers les montagnes de Judée pour l'aider. À son arrivée, Jean-Baptiste tressaille d'allégresse dans le sein de sa mère, et Marie entonne le Magnificat.", 
        fruit: "La charité fraternelle active et l'empressement à servir le prochain.",
        scripture: "« Élisabeth fut remplie d'Esprit Saint, et s'écria : 'Tu es bénie entre toutes les femmes !' » (Lc 1, 41-42)"
      },
      { 
        title: "La Nativité", 
        description: "Jésus, le Verbe fait chair, naît dans le dénuement d'une étable à Bethléem. Marie le dépose dans une crèche. Les anges annoncent la paix aux hommes de bonne volonté, tandis que bergers et mages viennent adorer le Roi des Rois.", 
        fruit: "L'esprit de pauvreté évangélique et le détachement des richesses matérielles.",
        scripture: "« Elle mit au monde son fils premier-né ; elle l'emmaillota et le coucha dans une crèche. » (Lc 2, 7)"
      },
      { 
        title: "La Présentation", 
        description: "Quarante jours après la naissance, Marie et Joseph présentent l'Enfant Jésus au Temple pour accomplir la Loi. Le vieillard Siméon le prend dans ses bras et le proclame 'Lumière pour éclairer les nations'.", 
        fruit: "La pureté du cœur et l'esprit d'obéissance aux préceptes de l'Église.",
        scripture: "« Mes yeux ont vu le salut que tu préparais à la face des peuples. » (Lc 2, 30-31)"
      },
      { 
        title: "Le Recouvrement", 
        description: "Après trois jours de recherche angoissée à Jérusalem, Marie et Joseph retrouvent Jésus, âgé de douze ans, au milieu des docteurs de la Loi. Il leur rappelle qu'il doit être aux affaires de son Père céleste.", 
        fruit: "La recherche constante de Dieu et la persévérance dans la vie spirituelle.",
        scripture: "« Ne saviez-vous pas que j'ai à être chez mon Père ? » (Lc 2, 49)"
      }
    ]
  },
  {
    id: 'lumineux',
    title: 'Mystères Lumineux',
    description: "Ces mystères nous font méditer sur la vie publique de Jésus, révélant sa divinité et sa mission de salut pour l'humanité.",
    days: ['Jeudi'],
    mysteries: [
      { 
        title: "Le Baptême de Jésus", 
        description: "Jésus descend dans les eaux du Jourdain pour être baptisé par Jean. Les cieux s'ouvrent, l'Esprit descend comme une colombe et la voix du Père proclame : 'Celui-ci est mon Fils bien-aimé, en qui j'ai mis toute ma joie'.", 
        fruit: "La fidélité aux promesses de notre baptême et la conscience de notre dignité d'enfants de Dieu.",
        scripture: "« Dès que Jésus fut baptisé, il vit l'Esprit de Dieu descendre comme une colombe. » (Mt 3, 16)"
      },
      { 
        title: "Les Noces de Cana", 
        description: "Lors d'un mariage, le vin venant à manquer, Marie intercède auprès de son Fils. Jésus change l'eau en vin, manifestant ainsi sa gloire. C'est le premier de ses signes, accompli grâce à la foi de sa Mère.", 
        fruit: "La confiance absolue en l'intercession de Marie et l'écoute de ses conseils : 'Faites tout ce qu'il vous dira'.",
        scripture: "« Sa mère dit à ceux qui servaient : 'Tout ce qu'il vous dira, faites-le.' » (Jn 2, 5)"
      },
      { 
        title: "L'Annonce du Royaume", 
        description: "Jésus parcourt les villes et les villages, prêchant la Bonne Nouvelle du Royaume de Dieu et appelant à la conversion. Il guérit les malades et pardonne aux pécheurs, manifestant la miséricorde infinie du Père.", 
        fruit: "La conversion sincère du cœur et le zèle pour l'évangélisation.",
        scripture: "« Les temps sont accomplis : le règne de Dieu est tout proche. Convertissez-vous. » (Mc 1, 15)"
      },
      { 
        title: "La Transfiguration", 
        description: "Sur le mont Thabor, devant Pierre, Jacques et Jean, le visage de Jésus devient éclatant comme le soleil et ses vêtements blancs comme la lumière. Moïse et Élie apparaissent, témoignant que Jésus est l'accomplissement de la Loi et des Prophètes.", 
        fruit: "Le désir de la sainteté et la contemplation de la gloire divine pour fortifier notre foi.",
        scripture: "« Son visage devint brillant comme le soleil, et ses vêtements, blancs comme la lumière. » (Mt 17, 2)"
      },
      { 
        title: "L'Institution de l'Eucharistie", 
        description: "Lors de la dernière Cène, Jésus prend le pain et le vin, les bénit et les donne à ses apôtres en disant : 'Ceci est mon corps, ceci est mon sang'. Il institue ainsi le sacrement de son amour permanent parmi nous.", 
        fruit: "L'amour profond pour l'Eucharistie et la participation fervente au Saint Sacrifice de la Messe.",
        scripture: "« Ceci est mon corps, donné pour vous. Faites cela en mémoire de moi. » (Lc 22, 19)"
      }
    ]
  },
  {
    id: 'douloureux',
    title: 'Mystères Douloureux',
    description: "Ces mystères nous font méditer sur la passion et la mort de Jésus, nous montrant le prix infini de notre rédemption.",
    days: ['Mardi', 'Vendredi'],
    mysteries: [
      { 
        title: "L'Agonie au Jardin", 
        description: "Au jardin des Oliviers, Jésus ressent l'angoisse devant la souffrance et le poids des péchés du monde. Il prie intensément : 'Père, non pas ma volonté, mais la tienne'. Sa sueur devient comme des gouttes de sang tombant à terre.", 
        fruit: "La contrition sincère de nos péchés et la force de dire 'Oui' à Dieu dans l'épreuve.",
        scripture: "« Père, si tu le veux, éloigne de moi cette coupe ; cependant, que ce ne soit pas ma volonté qui se fasse, mais la tienne. » (Lc 22, 42)"
      },
      { 
        title: "La Flagellation", 
        description: "Livré aux mains des soldats romains, Jésus est attaché à une colonne et cruellement flagellé. Il endure ce supplice dans le silence et la patience, offrant ses souffrances pour la guérison de nos âmes.", 
        fruit: "La mortification des sens et la patience héroïque dans les souffrances physiques.",
        scripture: "« Pilate fit alors saisir Jésus pour qu'il soit flagellé. » (Jn 19, 1)"
      },
      { 
        title: "Le Couronnement d'épines", 
        description: "Par dérision, les soldats tressent une couronne d'épines et l'enfoncent sur la tête de Jésus. Ils le revêtent d'un manteau de pourpre, lui donnent un roseau pour sceptre et se moquent de lui en disant : 'Salut, roi des Juifs !'.", 
        fruit: "La mortification de l'orgueil et la guérison de nos pensées vaines.",
        scripture: "« Les soldats tressèrent une couronne avec des épines, et la lui mirent sur la tête. » (Jn 19, 2)"
      },
      { 
        title: "Le Portement de la Croix", 
        description: "Condamné à mort, Jésus charge sa lourde croix sur ses épaules meurtries. Sur le chemin du Calvaire, il porte courageusement son fardeau, tombant plusieurs fois mais se relevant par amour pour nous.", 
        fruit: "La patience dans les épreuves quotidiennes et le courage de porter notre croix à la suite du Christ.",
        scripture: "« Jésus, portant lui-même sa croix, sortit en direction du lieu dit : Le Crâne (Golgotha). » (Jn 19, 17)"
      },
      { 
        title: "Le Crucifiement", 
        description: "Arrivé au sommet du Calvaire, Jésus est dépouillé de ses vêtements et cloué sur la croix. Après trois heures d'agonie, il pardonne à ses bourreaux, nous donne Marie pour Mère et remet son esprit entre les mains du Père.", 
        fruit: "Un amour sans bornes pour Dieu et le pardon sincère des offenses reçues.",
        scripture: "« Père, entre tes mains je remets mon esprit. » (Lc 23, 46)"
      }
    ]
  },
  {
    id: 'glorieux',
    title: 'Mystères Glorieux',
    description: "Ces mystères nous font méditer sur la victoire éclatante de Jésus sur la mort et la gloire éternelle qui nous est promise.",
    days: ['Mercredi', 'Dimanche'],
    mysteries: [
      { 
        title: "La Résurrection", 
        description: "Le matin de Pâques, Jésus sort victorieux du tombeau, triomphant de la mort et du péché. Il apparaît à Marie-Madeleine et aux apôtres, leur apportant la paix et la certitude que la vie a vaincu la mort.", 
        fruit: "Une foi vive en la présence du Ressuscité et la joie de vivre en enfants de lumière.",
        scripture: "« Pourquoi cherchez-vous le Vivant parmi les morts ? Il n'est pas ici, il est ressuscité. » (Lc 24, 5-6)"
      },
      { 
        title: "L'Ascension", 
        description: "Quarante jours après sa résurrection, Jésus monte au ciel en présence de ses disciples. Il s'assoit à la droite du Père, nous ouvrant ainsi le chemin vers notre demeure éternelle et promettant de nous envoyer le Consolateur.", 
        fruit: "L'espérance ferme et le désir ardent du ciel, notre véritable patrie.",
        scripture: "« Tandis qu'il les bénissait, il se sépara d'eux et fut emporté au ciel. » (Lc 24, 51)"
      },
      { 
        title: "La Pentecôte", 
        description: "Réunis au Cénacle avec Marie, les apôtres reçoivent le Saint-Esprit sous forme de langues de feu. Remplis de force et de sagesse, ils sortent proclamer les merveilles de Dieu dans toutes les langues.", 
        fruit: "Le zèle pour l'apostolat et la docilité aux inspirations de l'Esprit Saint.",
        scripture: "« Tous furent remplis d'Esprit Saint : ils se mirent à parler en d'autres langues. » (Ac 2, 4)"
      },
      { 
        title: "L'Assomption", 
        description: "Au terme de sa vie terrestre, la Vierge Marie est élevée corps et âme dans la gloire céleste par les anges. Elle est la première créature à participer pleinement à la victoire de son Fils sur la mort.", 
        fruit: "La grâce d'une sainte mort et une dévotion filiale toujours plus profonde envers Marie.",
        scripture: "« Un signe grandiose apparut au ciel : une Femme, ayant le soleil pour manteau. » (Ap 12, 1)"
      },
      { 
        title: "Le Couronnement de Marie", 
        description: "Marie est couronnée Reine du ciel et de la terre par la Très Sainte Trinité. Elle brille désormais comme l'Étoile du matin, intercédant sans cesse pour ses enfants et nous guidant vers le Royaume de son Fils.", 
        fruit: "La confiance totale en la protection royale de Marie et la persévérance finale dans la grâce.",
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
