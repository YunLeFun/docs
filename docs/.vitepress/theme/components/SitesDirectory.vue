<script setup lang="ts">
import { computed } from 'vue'

import { sites } from '../../data/sites'

const categoryLabels = {
  product: '产品',
  documentation: '文档',
  collaboration: '协作',
  operations: '运营',
} as const

const publicSites = computed(() => sites.filter(site => site.visibility === 'public'))
</script>

<template>
  <div class="sites-directory">
    <aside class="sites-directory__intro" aria-label="目录说明">
      <p class="sites-directory__eyebrow">
        Public directory
      </p>
      <p class="sites-directory__summary">
        这里仅收录无需内部身份即可访问的云乐坊站点。后台、管理台和内部协作工具不会出现在此目录。
      </p>
      <dl class="sites-directory__facts">
        <div>
          <dt>可见性</dt>
          <dd>公开</dd>
        </div>
        <div>
          <dt>站点数</dt>
          <dd>{{ publicSites.length.toString().padStart(2, '0') }}</dd>
        </div>
      </dl>
    </aside>

    <section class="sites-directory__section" aria-labelledby="public-sites-title">
      <header class="sites-directory__section-header">
        <p>01 / PUBLIC</p>
        <h2 id="public-sites-title">
          公开站点
        </h2>
        <span>面向访客与开发者</span>
      </header>

      <ol class="sites-directory__list">
        <li v-for="(site, index) in publicSites" :key="site.id">
          <a class="sites-directory__link" :href="site.url" target="_blank" rel="noreferrer">
            <span class="sites-directory__index" aria-hidden="true">
              {{ (index + 1).toString().padStart(2, '0') }}
            </span>
            <span class="sites-directory__identity">
              <strong>{{ site.name }}</strong>
              <code>{{ site.domain }}</code>
            </span>
            <span class="sites-directory__description">{{ site.description }}</span>
            <span class="sites-directory__meta">
              <span>{{ categoryLabels[site.category] }}</span>
              <span class="sites-directory__visibility">公开</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6 14 14 6M8 6h6v6" />
              </svg>
            </span>
          </a>
        </li>
      </ol>
    </section>
  </div>
</template>
