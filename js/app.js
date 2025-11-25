/* ============================================
   TODO LIST - JAVASCRIPT
   Fonctionnalités et interactions dynamiques
   Responsable : Léandre
   ============================================ */

const categoryNameInput = document.getElementById('categoryNameInput');
const categoryIconInput = document.getElementById('categoryIconInput');
const iconPickerBtn = document.getElementById('iconPickerBtn');
const emojiPicker = document.getElementById('emojiPicker');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const categoryButtons = document.getElementById('categoryButtons');
const categorySelect = document.getElementById('categorySelect');
const inputTask = document.getElementById('taskInput');
const addButton = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let categories = [];
let selectedCategory = null;

// Emojis disponibles
const emojis = ['😊', '💼', '🎓', '🏠', '🎮', '🎨', '📚', '💪', '🍕', '✈️', '🎵', '⚽'];

// === GESTION ÉMOJIS ===
function initEmojiPicker() {
  const emojiPickerContent = emojiPicker.querySelector('.emoji-picker-content');
  const emojiGrid = document.createElement('div');
  emojiGrid.className = 'emoji-grid';
  
  emojis.forEach(emoji => {
    const emojiItem = document.createElement('div');
    emojiItem.className = 'emoji-item';
    emojiItem.textContent = emoji;
    emojiItem.addEventListener('click', () => selectEmoji(emoji));
    emojiGrid.appendChild(emojiItem);
  });
  
  emojiPickerContent.appendChild(emojiGrid);
}

function selectEmoji(emoji) {
  categoryIconInput.value = emoji;
  iconPickerBtn.textContent = emoji;
  emojiPicker.style.display = 'none';
}

iconPickerBtn.addEventListener('click', () => {
  emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
});

// === CATÉGORIES ===
function addCategory() {
  const categoryName = categoryNameInput.value.trim();
  const categoryIcon = categoryIconInput.value.trim() || '🗂️';
  
  if (categoryName === '') {
    alert('Veuillez entrer un nom de catégorie!');
    return;
  }
  
  categories.push({ name: categoryName, icon: categoryIcon, tasks: [] });
  categoryNameInput.value = '';
  categoryIconInput.value = '';
  iconPickerBtn.textContent = '';
  emojiPicker.style.display = 'none';
  
  displayCategories();
  updateCategorySelect();
}

function displayCategories() {
  categoryButtons.innerHTML = '';
  categories.forEach((category, index) => {
    const button = document.createElement('button');
    button.className = 'category-btn';
    if (selectedCategory === index) button.classList.add('active');
    button.textContent = `${category.icon} ${category.name}`;
    button.addEventListener('click', () => selectCategory(index));
    categoryButtons.appendChild(button);
  });
}

function selectCategory(index) {
  selectedCategory = index;
  categorySelect.value = String(index);
  displayCategories();
  displayTasks();
}

function updateCategorySelect() {
  categorySelect.innerHTML = '<option value="">Sélectionnez une catégorie...</option>';
  categories.forEach((category, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = `${category.icon} ${category.name}`;
    categorySelect.appendChild(option);
  });
}

// === TÂCHES ===
function addTask() {
  if (selectedCategory === null) {
    alert('Veuillez sélectionner une catégorie!');
    return;
  }
  
  const taskValue = inputTask.value.trim();
  if (taskValue === '') return;
  
  categories[selectedCategory].tasks.push(taskValue);
  inputTask.value = '';
  displayTasks();
}

function displayTasks() {
  taskList.innerHTML = '';
  
  if (selectedCategory === null) {
    const info = document.createElement('p');
    info.className = 'empty-message';
    info.textContent = 'Sélectionnez une catégorie pour voir ses tâches.';
    taskList.appendChild(info);
    return;
  }
  
  const category = categories[selectedCategory];
  
  const categoryTitle = document.createElement('h2');
  categoryTitle.style.color = 'var(--color-white)';
  categoryTitle.style.marginBottom = '16px';
  categoryTitle.textContent = `${category.icon} ${category.name}`;
  taskList.appendChild(categoryTitle);
  
  if (category.tasks.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'empty-message';
    emptyMsg.textContent = 'Aucune tâche dans cette catégorie';
    taskList.appendChild(emptyMsg);
    return;
  }
  
  category.tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task;
    const btn = document.createElement('button');
    btn.className = 'deleteBtn';
    btn.textContent = 'Supprimer';
    btn.addEventListener('click', () => deleteTask(index));
    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  if (selectedCategory === null) return;
  categories[selectedCategory].tasks.splice(index, 1);
  displayTasks();
}

// === ÉVÉNEMENTS ===
addCategoryBtn.addEventListener('click', addCategory);
addButton.addEventListener('click', addTask);
categorySelect.addEventListener('change', (e) => {
  if (e.target.value === '') {
    selectedCategory = null;
    displayCategories();
    displayTasks();
  } else {
    selectCategory(parseInt(e.target.value, 10));
  }
});
inputTask.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') addTask();
});

/* Initialisation */
initEmojiPicker();
displayCategories();
updateCategorySelect();
displayTasks();
