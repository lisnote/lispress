<template>
  <div id="nav-bar">
    <router-link to="/" id="logo"><div>Lispress</div></router-link>
    <div>
      <form method="get" action="/">
        <input type="text" placeholder="Search anything" name="search" />
      </form>
      <div id="sidebar-toggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#nav-bar {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 10px;
  > div {
    display: flex;
    > form {
      margin: 0 20px 0 10px;
      > input {
        height: 30px;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 0 10px;
      }
    }
  }
}
#logo {
  font-size: 25px;
  text-decoration: none;
  color: black;
}
#sidebar-toggle {
  margin: 2px 0 2px 5px;
  min-width: 30px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  @media screen and (min-width: 800px) {
    display: none;
  }
}
</style>
