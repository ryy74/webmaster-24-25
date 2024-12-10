import bbowl from '../../assets/vegan-bbowl.jpg';
import burger from '../../assets/vegan-burger.jpg';
import burrito from '../../assets/vegan-burrito.jpg';
import curry from '../../assets/Vegan-curry.jpg';
import kabob from '../../assets/Vegan-kabob.jpg';
import lasagna from '../../assets/Vegan-lasagna.jpg';
import masala from '../../assets/Vegan-masala.jpg';
import mc from '../../assets/Vegan-mc.jpg';
import pizza from '../../assets/Vegan-pizza.jpg';
import quesadillas from '../../assets/Vegan-quesadillas.jpg';
import salad from '../../assets/vegan-salad.jpg';
import soup from '../../assets/Vegan-soup.jpg';
import staco from '../../assets/Vegan-staco.jpg';
import stirfry from '../../assets/vegan-stirfry.jpg';
import sushi from '../../assets/Vegan-sushi.jpg';
import tacos from '../../assets/vegan-tacos.jpg';

const menuItems = [
  {
    id: 1,
    name: 'Vegan Tacos',
    description: 'Delicious plant-based tacos with fresh veggies and salsa.',
    image: tacos,
    longDescription:
      'Our vegan tacos feature soft corn tortillas loaded with a vibrant mix of seasoned black beans, fresh pico de gallo, crisp lettuce, creamy avocado, and a tangy green cilantro-lime sauce. They are finished with a sprinkle of nutritional yeast and served with a side of lime wedges. Perfectly balanced flavors and textures come together to create a delightful meal that satisfies your cravings for something hearty yet plant-based.',
    ingredients: [
      'Corn tortillas',
      'Seasoned black beans',
      'Brown rice',
      'Pico de gallo (tomatoes, red onions, cilantro, lime juice)',
      'Lettuce',
      'Avocado slices',
      'Green cilantro-lime sauce (cilantro, lime juice, olive oil, garlic, nutritional yeast, jalapeño)',
      'Diced red bell peppers',
      'Pickled red onions',
      'Roasted sweet corn kernels',
      'Fresh cilantro leaves',
      'Nutritional yeast',
      'Garlic powder',
      'Cumin',
      'Smoked paprika',
      'Olive oil',
      'Lime wedges (for garnish)',
      'Salt',
      'Pepper',
    ],
    nutritionalInfo:
      'Each taco provides approximately 280 kcal, with 8g of protein, 6g of fiber, and 12g of healthy fats from avocado and olive oil. It’s a good source of vitamin C (from bell peppers and lime), vitamin A (from cilantro and lettuce), and iron (from black beans and nutritional yeast). This taco is entirely plant-based and uses wholesome ingredients that are both flavorful and nutritious.',
    allergens: [
      'Soy (from nutritional yeast)',
      'Cilantro (may be a sensitivity for some individuals)',
    ],
  },

  {
    id: 2,
    name: 'Vegetarian Burrito',
    description: 'A hearty burrito packed with rice, beans, and guacamole.',
    image: burrito,
    longDescription:
      'Our vegetarian burrito is a wholesome, flavor-packed meal wrapped in a soft flour tortilla. It’s filled with seasoned black beans, fluffy cilantro-lime rice, roasted bell peppers and onions, crisp lettuce, sweet corn, and tangy salsa. A creamy avocado-based Southwest sauce ties it all together for a vibrant, satisfying bite. Perfect for lunch, dinner, or whenever you’re craving a delicious, plant-based comfort food.',
    ingredients: [
      'Flour tortilla',
      'Cilantro-lime rice (white rice, cilantro, lime juice, olive oil)',
      'Seasoned black beans (black beans, garlic powder, cumin, smoked paprika)',
      'Roasted bell peppers (red, yellow, and green peppers)',
      'Sautéed onions',
      'Sweet corn kernels (roasted)',
      'Crisp romaine lettuce',
      'Fresh salsa (tomatoes, red onions, jalapeño, cilantro, lime juice, salt)',
      'Avocado-based Southwest sauce (avocado, lime juice, nutritional yeast, smoked paprika, garlic powder, olive oil, water)',
      'Diced fresh tomatoes',
      'Pickled jalapeños',
      'Minced fresh cilantro',
      'Garlic powder (for seasoning)',
      'Cumin (for seasoning)',
      'Smoked paprika (for seasoning)',
      'Olive oil (used in sauté and sauce)',
      'Salt (for flavor)',
      'Lime wedges (for garnish)',
    ],
    nutritionalInfo:
      'Each burrito provides approximately 450 kcal, with 15g of protein, 10g of fiber, and 18g of healthy fats from avocado and olive oil. It is a great source of iron (from black beans), vitamin C (from bell peppers and lime juice), and folate (from cilantro and lettuce). The burrito balances complex carbohydrates, protein, and fats, making it both filling and nutritious.',
    allergens: [
      'Wheat (from the tortilla)',
      'Soy (possible cross-contamination in black beans or nutritional yeast)',
      'Cilantro (may cause sensitivity in some individuals)',
    ],
  },

  {
    id: 3,
    name: 'Vegan Salad',
    description:
      'A fresh salad with mixed greens, chickpeas, and tahini dressing.',
    image: salad,
    longDescription:
      'This vibrant vegan salad is a perfect blend of fresh greens, hearty chickpeas, and colorful vegetables, all brought together with a creamy tahini-lemon dressing. Featuring a mix of kale, baby spinach, and crisp romaine, it’s topped with shredded carrots, thinly sliced beets, roasted chickpeas, and crunchy cashews. The dressing is a rich blend of tahini, lemon juice, garlic, and a touch of maple syrup, adding a zesty and slightly sweet note. A nourishing and flavorful choice for a light yet satisfying meal.',
    ingredients: [
      'Baby spinach leaves',
      'Chopped kale',
      'Romaine lettuce',
      'Shredded carrots',
      'Thinly sliced raw beets',
      'Roasted chickpeas (seasoned with smoked paprika, garlic powder, and olive oil)',
      'Raw cashews',
      'Cherry tomatoes (halved)',
      'Cucumber slices',
      'Thinly sliced red onions',
      'Tahini dressing (tahini, lemon juice, garlic, maple syrup, olive oil, water, salt)',
      'Fresh parsley leaves (for garnish)',
      'Black sesame seeds (optional garnish)',
      'Salt (for seasoning)',
      'Freshly ground black pepper (for seasoning)',
    ],
    nutritionalInfo:
      'Each serving of the salad provides approximately 300 kcal, with 10g of protein, 8g of fiber, and 12g of healthy fats from tahini and cashews. It is a great source of vitamins A, C, and K (from leafy greens and carrots), iron (from chickpeas and spinach), and magnesium (from cashews). The dressing contributes calcium from the tahini and adds a creamy texture without dairy.',
    allergens: [
      'Sesame (from tahini)',
      'Tree nuts (cashews)',
      'Legumes (chickpeas, may be an allergen for some individuals)',
    ],
  },

  {
    id: 4,
    name: 'Vegan Burger',
    description:
      'A delicious vegan patty with lettuce, tomato, and a smoky sauce.',
    image: burger,
    longDescription:
      'Our vegan burger is a flavorful and hearty plant-based option that’s perfect for burger lovers. It features a tender plant-based patty served on a soft, whole-grain bun. The burger is topped with crisp romaine lettuce, juicy slices of ripe tomato, and caramelized onions for a touch of sweetness. The highlight is the creamy, smoky sauce made with vegan mayo, smoked paprika, garlic, and a hint of lemon juice, adding depth and richness to every bite. Simple, satisfying, and packed with plant-based goodness.',
    ingredients: [
      'Whole-grain burger bun',
      'Plant-based burger patty (made from pea protein, mushrooms, and seasonings)',
      'Crisp romaine lettuce',
      'Sliced ripe tomato',
      'Caramelized onions (cooked with olive oil and a pinch of salt)',
      'Smoky sauce (vegan mayonnaise, smoked paprika, garlic powder, lemon juice, olive oil, water)',
      'Olive oil (used for caramelizing onions)',
      'Salt (for seasoning)',
      'Pepper (for seasoning)',
    ],
    nutritionalInfo:
      'Each burger provides approximately 350 kcal, with 15g of protein, 5g of fiber, and 10g of healthy fats from olive oil and the plant-based patty. It’s an excellent source of iron (from the plant-based patty and whole-grain bun) and vitamin C (from tomatoes and the smoky sauce). The burger is satisfying and balanced, offering a guilt-free indulgence.',
    allergens: [
      'Wheat (from the whole-grain bun)',
      'Soy (from the vegan mayonnaise)',
      'Pea protein (common allergen in plant-based patties)',
    ],
  },

  {
    id: 5,
    name: 'Vegan Pizza',
    description:
      'A crispy thin crust topped with marinara, vegan cheese, mushrooms, and spinach.',
    image: pizza,
    longDescription:
      'Our vegan pizza features a thin, crispy crust as the base for a delicious blend of plant-based toppings. A rich roasted tomato marinara sauce is spread generously over the crust, followed by a layer of melty vegan mozzarella cheese. The pizza is finished with fresh spinach leaves, sautéed mushrooms, and a sprinkling of caramelized onions for added flavor. Each bite delivers a perfect combination of savory, cheesy, and fresh flavors, making it a must-try for pizza lovers.',
    ingredients: [
      'Thin crust (made from whole wheat flour, olive oil, water, and yeast)',
      'Roasted tomato marinara sauce (roasted tomatoes, garlic, olive oil, salt, oregano)',
      'Vegan mozzarella cheese (coconut oil, tapioca starch, potato starch, nutritional yeast)',
      'Fresh spinach leaves',
      'Sautéed mushrooms (button mushrooms, olive oil, garlic)',
      'Caramelized onions (thinly sliced, cooked with olive oil and a pinch of salt)',
      'Olive oil (used in crust, sauce, and sautéing)',
      'Garlic powder (for seasoning the sauce)',
      'Oregano (for seasoning the sauce)',
      'Salt (for flavor)',
    ],
    nutritionalInfo:
      'Each slice provides approximately 280 kcal, with 6g of protein, 3g of fiber, and 12g of healthy fats. The pizza is rich in vitamin C (from spinach and tomatoes), calcium (from vegan mozzarella), and iron (from spinach and mushrooms). It is a well-balanced, flavorful plant-based option that doesn’t compromise on taste or satisfaction.',
    allergens: [
      'Wheat (from the crust)',
      'Soy (possible cross-contamination in vegan mozzarella)',
      'Coconut (from vegan mozzarella)',
    ],
  },

  {
    id: 6,
    name: 'Vegan Mac and Cheese',
    description:
      'Creamy, cheesy, and comforting made from cashews, nutritional yeast, and turmeric.',
    image: mc,
    longDescription:
      'This vegan mac and cheese is the ultimate comfort food, featuring tender macaroni noodles coated in a rich, velvety, plant-based cheese sauce. The sauce is made with cashews, nutritional yeast, and a touch of turmeric for a natural golden hue. It’s topped with finely chopped green onions for a fresh pop of flavor and a sprinkle of cracked black pepper to balance the creaminess. A dish that’s hearty, satisfying, and perfect for plant-based eaters.',
    ingredients: [
      'Macaroni pasta (made with durum wheat)',
      'Cashew-based cheese sauce (cashews, nutritional yeast, turmeric, garlic powder, lemon juice, olive oil, water)',
      'Chopped green onions',
      'Cracked black pepper',
      'Salt (for seasoning)',
      'Olive oil (for the sauce)',
    ],
    nutritionalInfo:
      'Each serving provides approximately 350 kcal, with 10g of protein, 5g of fiber, and 14g of healthy fats from cashews and olive oil. It’s a good source of vitamin B12 (from nutritional yeast), magnesium (from cashews), and iron (from the pasta and cashews). The dish is indulgent yet nutritious, delivering a classic cheesy flavor without dairy.',
    allergens: [
      'Wheat (from the pasta)',
      'Tree nuts (cashews)',
      'Soy (possible cross-contamination in nutritional yeast)',
    ],
  },

  {
    id: 7,
    name: 'Vegetarian Lasagna',
    description: 'Layers of noodles, ricotta, spinach, and marinara sauce.',
    image: lasagna,
    longDescription:
      'Our vegetarian lasagna is a comforting classic made with layers of tender lasagna noodles, creamy ricotta cheese, a rich marinara sauce, and fresh leafy greens. The dish is topped with melted mozzarella cheese and garnished with fresh cilantro for a unique twist. Baby spinach and parsley are layered throughout for added freshness and flavor. Every bite is a perfect combination of cheesy, savory, and herbaceous flavors.',
    ingredients: [
      'Lasagna noodles (made from semolina wheat)',
      'Ricotta cheese',
      'Mozzarella cheese (shredded)',
      'Marinara sauce (tomatoes, garlic, olive oil, oregano, basil, salt)',
      'Baby spinach',
      'Fresh parsley (chopped, layered inside)',
      'Fresh cilantro (garnish)',
      'Garlic (for the sauce)',
      'Oregano (for seasoning)',
      'Olive oil (used in the sauce)',
      'Salt (for seasoning)',
      'Black pepper (for seasoning)',
    ],
    nutritionalInfo:
      'Each slice provides approximately 400 kcal, with 15g of protein, 4g of fiber, and 12g of fats. It is an excellent source of calcium (from ricotta and mozzarella), vitamin A (from spinach and parsley), and iron (from spinach and lasagna noodles). This lasagna is hearty and filling, making it a perfect choice for a satisfying meal.',
    allergens: [
      'Wheat (from the lasagna noodles)',
      'Dairy (from ricotta and mozzarella cheese)',
      'Garlic (potential allergen for some individuals)',
    ],
  },

  {
    id: 8,
    name: 'Chickpea Curry',
    description:
      'A warm, aromatic curry made with chickpeas, coconut milk, and a blend of spices.',
    image: curry,
    longDescription:
      'Our chickpea curry is a comforting dish made with tender chickpeas simmered in a creamy, spiced coconut milk sauce. The vibrant orange sauce is packed with warm spices and finished with a sprinkle of fresh cilantro and green onions for brightness. Served with lime wedges on top for a tangy twist, this curry is a perfect balance of creamy, savory, and citrusy flavors. A touch of roasted corn and fresh salsa adds a unique texture and a refreshing contrast.',
    ingredients: [
      'Chickpeas (cooked)',
      'Coconut milk (full-fat)',
      'Curry spices (cumin, coriander, turmeric, smoked paprika, garam masala)',
      'Onions (diced)',
      'Garlic (minced)',
      'Fresh ginger (grated)',
      'Diced tomatoes (for the sauce)',
      'Vegetable broth (for simmering)',
      'Roasted corn kernels (garnish)',
      'Fresh salsa (optional garnish)',
      'Fresh cilantro (chopped, garnish)',
      'Sliced green onions (garnish)',
      'Lime wedges (garnish)',
      'Olive oil (for sautéing)',
      'Salt (for seasoning)',
      'Black pepper (for seasoning)',
    ],
    nutritionalInfo:
      'Each serving provides approximately 350 kcal, with 12g of protein, 8g of fiber, and 15g of healthy fats from coconut milk. It’s a rich source of vitamin C (from lime and salsa), potassium (from chickpeas), and iron (from the spices and chickpeas). This dish is satisfying, warming, and packed with nourishing ingredients.',
    allergens: [
      'Coconut (from coconut milk)',
      'Garlic (potential allergen for some individuals)',
    ],
  },

  {
    id: 9,
    name: 'Vegan Burrito Bowl',
    description: 'A bowl of rice, black beans, corn, guacamole, and salsa.',
    image: bbowl,
    longDescription:
      'Our vegan burrito bowl is a deconstructed burrito served in a vibrant and hearty bowl. It features fluffy cilantro-lime rice as the base, topped with seasoned black beans, fresh guacamole, and a colorful mix of grilled zucchini, roasted bell peppers, sweet corn, and diced tomatoes. Garnished with fresh cilantro and lime wedges, this bowl is a perfect balance of flavors and textures.',
    ingredients: [
      'Cilantro-lime rice (white rice, cilantro, lime juice, olive oil)',
      'Black beans (seasoned with cumin and garlic powder)',
      'Fresh guacamole (avocado, lime juice, garlic, cilantro)',
      'Sweet corn kernels',
      'Diced tomatoes',
      'Grilled zucchini (sliced, lightly seasoned)',
      'Roasted bell peppers (red, yellow, and green)',
      'Fresh cilantro (chopped)',
      'Lime wedges (for garnish)',
      'Salt (for seasoning)',
      'Pepper (for seasoning)',
      'Olive oil (used in grilling and cooking)',
    ],
    nutritionalInfo:
      'Each bowl provides approximately 400 kcal, with 12g of protein, 9g of fiber, and 15g of healthy fats. It’s a good source of vitamin C (from bell peppers and lime), potassium (from zucchini and avocado), and iron (from black beans). The burrito bowl is satisfying, customizable, and entirely plant-based.',
    allergens: ['Avocado (potential allergen for certain individuals)'],
  },

  {
    id: 10,
    name: 'Grilled Veggie Skewers',
    description:
      'Skewers of marinated zucchini, bell peppers, onions, and mushrooms.',
    image: kabob,
    longDescription:
      'Our grilled veggie skewers are a colorful, smoky, and delicious plant-based dish. They feature marinated zucchini, bell peppers, and mushrooms threaded onto skewers, grilled until tender and slightly charred. The vegetables are coated in a savory olive oil and garlic marinade with hints of smoked paprika and Italian herbs. These skewers are perfect as a main course or a flavorful side dish.',
    ingredients: [
      'Zucchini (sliced into thick rounds)',
      'Bell peppers (red, yellow, and green, cut into chunks)',
      'Button mushrooms (whole or halved)',
      'Garlic marinade (olive oil, minced garlic, smoked paprika, Italian seasoning, salt, black pepper)',
      'Fresh parsley (chopped, for garnish)',
      'Lemon wedges (for serving)',
    ],
    nutritionalInfo:
      'Each serving of skewers provides approximately 150 kcal, with 4g of protein, 3g of fiber, and 8g of healthy fats from olive oil. The skewers are an excellent source of vitamin C (from bell peppers), potassium (from zucchini), and antioxidants (from mushrooms). They are light, flavorful, and perfect for grilling enthusiasts.',
    allergens: [
      'Garlic (potential allergen for some individuals)',
      'Mushrooms (potential allergen for some individuals)',
    ],
  },

  {
    id: 11,
    name: 'Vegan Stir Fry',
    description:
      'A mix of fresh vegetables stir-fried in a savory soy-based sauce, served over jasmine rice.',
    image: stirfry,
    longDescription:
      'This vegan stir fry is a vibrant mix of colorful vegetables and hearty brown rice, sautéed to perfection in a savory soy-based sauce. The dish features tender zucchini, sweet bell peppers, peas, carrots, and pineapple chunks, complemented by roasted cashews for added crunch. Infused with garlic, ginger, and Thai chili paste, each bite delivers a delightful balance of sweet, tangy, and savory flavors.',
    ingredients: [
      'Cooked brown rice',
      'Zucchini (sliced into half-moons)',
      'Red and yellow bell peppers (sliced)',
      'Carrots (julienned)',
      'Peas (frozen or fresh)',
      'Pineapple chunks (fresh or canned)',
      'Roasted cashews',
      'Garlic (minced)',
      'Ginger (grated)',
      'Soy sauce or tamari (for gluten-free option)',
      'Thai chili paste',
      'Sesame oil (for stir-frying)',
      'Vegetable broth (for deglazing)',
      'Scallions (sliced, for garnish)',
      'Fresh Thai basil (for garnish)',
    ],
    nutritionalInfo:
      'Each serving provides approximately 350 kcal, with 8g of protein, 6g of fiber, and 12g of healthy fats from sesame oil and cashews. The stir fry is a great source of vitamin A (from carrots), vitamin C (from bell peppers), and potassium (from zucchini and pineapple). It’s light, flavorful, and packed with nutrients.',
    allergens: [
      'Soy (from soy sauce or tamari)',
      'Tree nuts (cashews)',
      'Sesame (from sesame oil)',
    ],
  },

  {
    id: 12,
    name: 'Vegetarian Sushi Rolls',
    description:
      'Sushi rolls with avocado, cucumber, and pickled radish, served with soy sauce.',
    image: sushi,
    longDescription:
      'Our vegetarian sushi rolls are a vibrant mix of flavors and textures, featuring creamy avocado, crunchy cucumber, and sweet-tangy pickled radish wrapped in seasoned sushi rice and nori. The rolls are garnished with thinly julienned red cabbage, carrots, and zucchini for added color and crunch. Served with a side of soy sauce, these rolls are a refreshing and light plant-based take on a sushi classic.',
    ingredients: [
      'Sushi rice (seasoned with rice vinegar, sugar, and salt)',
      'Nori sheets (seaweed)',
      'Avocado (sliced)',
      'Cucumber (sliced into matchsticks)',
      'Pickled radish (yellow daikon, sliced)',
      'Red cabbage (julienned)',
      'Carrots (julienned)',
      'Zucchini (julienned)',
      'Soy sauce (for dipping)',
      'Wasabi (optional garnish)',
      'Pickled ginger (optional garnish)',
    ],
    nutritionalInfo:
      'Each sushi roll provides approximately 200 kcal, with 4g of protein, 3g of fiber, and 5g of healthy fats. It’s a great source of vitamin C (from red cabbage), potassium (from avocado), and fiber (from vegetables and sushi rice). This dish is light, refreshing, and full of fresh plant-based ingredients.',
    allergens: [
      'Soy (from soy sauce)',
      'Gluten (if not using gluten-free soy sauce)',
      'Avocado (potential allergen for some individuals)',
    ],
  },

  {
    id: 13,
    name: 'Sweet Potato Tacos',
    description:
      'Soft tortillas filled with roasted sweet potatoes, black beans, avocado, and slaw.',
    image: staco,
    longDescription:
      'Our sweet potato tacos are a delicious plant-based option featuring soft corn tortillas stuffed with roasted sweet potatoes, seasoned black beans, and creamy avocado slices. Topped with a vibrant red cabbage slaw and tangy lime crema, these tacos are a delightful mix of textures and flavors. Garnished with fresh cilantro and lime wedges, they are perfect for a light yet satisfying meal.',
    ingredients: [
      'Corn tortillas',
      'Roasted sweet potatoes (seasoned with olive oil, smoked paprika, and cumin)',
      'Black beans (seasoned with garlic powder and salt)',
      'Creamy avocado slices',
      'Red cabbage slaw (shredded cabbage, lime juice, olive oil, salt)',
      'Crisp romaine lettuce',
      'Diced cherry tomatoes',
      'Tofu crumbles (lightly seasoned and pan-fried)',
      'Lime crema (vegan mayonnaise, lime juice, garlic powder, water)',
      'Fresh cilantro (chopped)',
      'Lime wedges (for garnish)',
      'Salt (for seasoning)',
    ],
    nutritionalInfo:
      'Each taco provides approximately 280 kcal, with 8g of protein, 6g of fiber, and 10g of healthy fats. It is rich in vitamin A (from sweet potatoes), vitamin C (from cabbage and lime), and potassium (from avocado). A colorful, nutrient-packed meal that is both flavorful and wholesome.',
    allergens: [
      'Soy (from tofu crumbles)',
      'Corn (from tortillas)',
      'Cilantro (may cause sensitivity in some individuals)',
    ],
  },

  {
    id: 14,
    name: 'Vegan Quesadilla',
    description:
      'A crispy tortilla filled with vegan cheese, beans, and sautéed vegetables.',
    image: quesadillas,
    longDescription:
      'Our vegan quesadilla is a delicious, plant-based take on a classic favorite. It features a crispy flour tortilla filled with seasoned black beans, sautéed bell peppers, roasted corn, and a blend of fresh tomatoes and red cabbage for added crunch. Melty vegan cheese ties everything together, while a hint of jalapeño adds a touch of spice. Perfectly grilled to golden perfection, this quesadilla is served with a side of salsa and lime wedges for a refreshing finish.',
    ingredients: [
      'Flour tortilla',
      'Vegan cheese (shredded)',
      'Black beans (seasoned with cumin and garlic powder)',
      'Sautéed bell peppers (red and green)',
      'Roasted corn kernels',
      'Fresh diced tomatoes',
      'Shredded red cabbage',
      'Minced jalapeño',
      'Olive oil (for grilling)',
      'Lime wedges (for garnish)',
    ],
    nutritionalInfo:
      'Each quesadilla provides approximately 300 kcal, with 10g of protein, 7g of fiber, and 12g of healthy fats from olive oil and vegan cheese. It’s a good source of vitamin C (from bell peppers and tomatoes), calcium (from vegan cheese), and potassium (from black beans). Light yet satisfying, it’s a perfect snack or meal.',
    allergens: [
      'Wheat (from the tortilla)',
      'Soy (from vegan cheese)',
      'Cilantro (if added in optional garnish)',
    ],
  },

  {
    id: 15,
    name: 'Lentil Soup',
    description:
      'A hearty soup made with lentils, carrots, celery, and tomatoes.',
    image: soup,
    longDescription:
      'Our lentil soup is a warm and comforting bowl of goodness, featuring tender brown lentils simmered in a flavorful vegetable broth. The soup includes diced carrots, tomatoes, and golden potatoes for added heartiness, with fresh spinach leaves stirred in for a burst of green. Seasoned with garlic, cumin, and smoked paprika, it delivers a rich and satisfying flavor profile. Perfect for a cozy meal on a cold day.',
    ingredients: [
      'Brown lentils (cooked)',
      'Vegetable broth',
      'Diced carrots',
      'Diced golden potatoes',
      'Chopped fresh tomatoes',
      'Fresh spinach leaves',
      'Garlic (minced)',
      'Cumin (for seasoning)',
      'Smoked paprika (for seasoning)',
      'Salt (for seasoning)',
    ],
    nutritionalInfo:
      'Each serving provides approximately 250 kcal, with 12g of protein, 8g of fiber, and 4g of healthy fats. The soup is rich in iron (from lentils and spinach), vitamin A (from carrots and spinach), and potassium (from potatoes). It’s light, nourishing, and perfect for a healthy meal.',
    allergens: [
      'Celery (may be an allergen for some individuals)',
      'Garlic (potential allergen for some individuals)',
    ],
  },

  {
    id: 16,
    name: 'Cauliflower Tikka Masala',
    description: 'Roasted cauliflower in a rich, flavorful tomato-based sauce.',
    image: masala,
    longDescription:
      'Our cauliflower tikka masala is a bold and flavorful Indian-inspired dish. It features tender roasted cauliflower florets simmered in a spiced tomato and coconut milk curry sauce, creating a creamy and aromatic base. Served with steamed basmati rice sprinkled with black sesame seeds, the dish is garnished with fresh cilantro and a touch of cracked black pepper. A perfect combination of rich spices and vibrant flavors, this tikka masala is a plant-based twist on a classic favorite.',
    ingredients: [
      'Roasted cauliflower florets (tossed with olive oil, smoked paprika, and turmeric)',
      'Tomato-based curry sauce (tomato purée, coconut milk, garlic, ginger, garam masala, cumin, coriander, cayenne pepper, salt)',
      'Steamed basmati rice',
      'Black sesame seeds (for garnish)',
      'Fresh cilantro leaves (chopped)',
      'Cracked black pepper (for garnish)',
      'Garlic (minced, used in sauce)',
      'Ginger (grated, used in sauce)',
      'Olive oil (for roasting cauliflower)',
      'Cayenne pepper (for spice)',
      'Salt (for seasoning)',
    ],
    nutritionalInfo:
      'Each serving provides approximately 350 kcal, with 7g of protein, 5g of fiber, and 15g of healthy fats from coconut milk and olive oil. The dish is rich in vitamin C (from tomatoes and cauliflower), iron (from the curry spices and cauliflower), and antioxidants. It’s a satisfying and flavorful plant-based meal.',
    allergens: [
      'Coconut (from coconut milk)',
      'Sesame (from black sesame seeds)',
      'Garlic (potential allergen for some individuals)',
    ],
  },
];

export default menuItems;
