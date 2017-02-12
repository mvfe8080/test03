<template>
  <div>
    <md-layout md-gutter="16" class="layout-left-bgcolor">
      <md-layout md-flex="50">
        <span>
          <div class="phone-viewport">
            <md-toolbar>
              <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
                <md-icon>menu</md-icon>
              </md-button>

              <h2 class="md-title">이것은 메뉴입니다</h2>
              <md-button class="md-raised md-accent" @click.native="toggleRightSidenav">오른쪽 메뉴 토글</md-button>
            </md-toolbar>

            <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
              <md-toolbar class="md-large">
                <div class="md-toolbar-container">
                  <h3 class="md-title">Sidenav content</h3>
                </div>
              </md-toolbar>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
            </md-sidenav>

            <md-sidenav class="md-right" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
              <md-toolbar>
                <div class="md-toolbar-container">
                  <h3 class="md-title">Sidenav content</h3>
                </div>
              </md-toolbar>

              <md-button class="md-raised md-accent" @click.native="closeRightSidenav">Close</md-button>
            </md-sidenav>
          </div>
        </span>
      </md-layout>
    </md-layout>

    <md-layout md-align="center" md-gutter="16" class="layout-middle-bgcolor">
      <md-layout md-flex="66">
        <span>
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">Title goes here</div>
              <div class="md-subhead">Subtitle here</div>
            </md-card-header>

            <md-card-content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
            </md-card-content>

            <md-card-actions>
              <md-button>Action</md-button>
              <md-button>Action</md-button>
            </md-card-actions>
          </md-card>
        </span>
      </md-layout>
      <md-layout md-flex="34">
        <span>
          <md-card>
            <md-card-area>
              <md-card-media>
                <img src="../assets/card-image-1.jpg" alt="People">
              </md-card-media>

              <md-card-header>
                <div class="md-title">Title goes here</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header>

              <md-card-content>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
              </md-card-content>
            </md-card-area>

            <md-card-actions>
              <md-button>Action</md-button>
              <md-button>Action</md-button>
            </md-card-actions>
          </md-card>
        </span>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
  toggleLeftSidenav() {
    this.$refs.leftSidenav.toggle();
  },
  toggleRightSidenav() {
    this.$refs.rightSidenav.toggle();
  },
  closeRightSidenav() {
    this.$refs.rightSidenav.close();
  },
  open(ref) {
    console.log('Opened: ' + ref);
  },
  close(ref) {
    console.log('Closed: ' + ref);
  }
}
}
</script>

<style scoped>
.layout-left-bgcolor {
  background-color: #738c82;
}
.layout-middle-bgcolor {
  background-color: #e6fff5;
}
.layout-right-bgcolor {
  background-color: #00331f;
}
</style>
