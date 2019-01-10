<%inherit file="base.mako"/>

<nav class="menu">
  <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open" />
  <label class="menu-open-button" for="menu-open">
  <span class="lines line-1"></span>
  <span class="lines line-2"></span>
  <span class="lines line-3"></span>
  </label>

  <a href="/menu" class="menu-item blue"> <i class="fas fa-home"></i> </a>
  <a href="/modules" class="menu-item green"> <i class="fas fa-puzzle-piece"></i> </a>
  <a href="/favorites" class="menu-item red"> <i class="fa fa-heart"></i> </a>
  <a href="/scenarios" class="menu-item purple"> <i class="fas fa-tasks"></i> </a>
  <a href="/configuration" class="menu-item orange"> <i class="fas fa-tools"></i> </a>
  <a href="/account" class="menu-item lightblue"> <i class="fa fa-user-circle"></i> </a>
</nav>