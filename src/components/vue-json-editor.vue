<template>
  <section class="vue-json-editor">
    <div class="select">
      <el-tree
        node-key="key"
        :data="tree"
        :indent="10"
        :expand-on-click-node="false"
        :render-content="renderContent"
        default-expand-all
      />
    </div>
    <div class="json">
      <pre class="pre" v-text="jsonText"></pre>
    </div>
  </section>
</template>

<script>
import { travelNode, randomId } from "./util";
import { ROOT_TYPES, VALUE_TYPES } from "./type";

export default {
  name: "VueJsonEditor",
  props: {
    // data: {
    //   type: Object,
    //   required: false,
    //   default: () => ({
    //     key: "root",
    //     value: [],
    //     type: "array",
    //     isRoot: true,
    //     children: []
    //   })
    // }
  },
  data() {
    return {
      tree: [
        {
          key: "root",
          value: [],
          type: "array",
          isRoot: true,
          children: []
        }
      ]
    };
  },
  computed: {
    jsonText() {
      const root = this.tree[0];
      const json = travelNode(root).root;

      this.$emit("change", JSON.stringify(json));
      return json;
    }
  },
  methods: {
    onChangeType(data) {
      const { type } = data;

      if (type === "number") {
        data.value = 0;
      } else if (type === "string") {
        data.value = "value";
      } else if (type === "boolean") {
        data.value = true;
      } else if (type === "array") {
        data.value = [];
      } else if (type === "object") {
        data.value = {};
      }

      data.children = [];
    },
    append(data) {
      const newChild = {
        key: data.type === "array" ? data.children.length : randomId(),
        value: "value",
        type: "string",
        children: []
      };

      if (!data.children) {
        this.$set(data, "children", []);
      }

      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.key === data.key);

      children.splice(index, 1);
    },
    renderContent(h, { node, data, store }) {
      const isRoot = data.isRoot;
      const parentType = node.parent.data.type;

      return (
        <el-row class="flex" gutter={8}>
          <el-col span={5}>
            <el-input
              placeholder="key"
              v-model={data.key}
              disabled={parentType === "array" || isRoot}
            ></el-input>
          </el-col>
          <el-col span={5}>
            {isRoot ? (
              <el-select
                v-model={data.type}
                on-change={() => this.onChangeType(data)}
              >
                {ROOT_TYPES.map(type => (
                  <el-option
                    key={type.value}
                    label={type.label}
                    value={type.value}
                  ></el-option>
                ))}
              </el-select>
            ) : (
              <el-select
                v-model={data.type}
                on-change={() => this.onChangeType(data)}
              >
                {VALUE_TYPES.map(type => (
                  <el-option
                    key={type.value}
                    label={type.label}
                    value={type.value}
                  ></el-option>
                ))}
              </el-select>
            )}
          </el-col>
          <el-col span={11}>
            {data.type === "string" && (
              <el-input
                placeholder="value"
                v-model={data.value}
                type="text"
              ></el-input>
            )}
            {data.type === "number" && (
              <el-input
                placeholder="value"
                v-model={data.value}
                type="number"
              ></el-input>
            )}
            {data.type === "boolean" && (
              <el-select v-model={data.value}>
                <el-option label="true" value={true}></el-option>
                <el-option label="false" value={false}></el-option>
              </el-select>
            )}
          </el-col>
          <el-col span={3}>
            {data.type === "object" && (
              <i class="el-icon-plus" on-click={() => this.append(data)} />
            )}

            {data.type === "array" && (
              <i class="el-icon-plus" on-click={() => this.append(data)} />
            )}

            {!isRoot && (
              <i
                class="el-icon-delete"
                on-click={() => this.remove(node, data)}
              />
            )}
          </el-col>
        </el-row>
      );
    }
  }
};
</script>

<style>
.vue-json-editor {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.vue-json-editor > .select,
.vue-json-editor > .json {
  width: 47.5%;
  padding: 1rem;
  text-align: left;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
}

.vue-json-editor > .json {
  padding-bottom: 30px;
}

.el-tree-node__content {
  height: auto;
  padding-top: 6px;
  padding-bottom: 6px;
}

.pre {
  margin: 0;
}

.flex {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.el-icon-plus {
  padding: 4px;
  color: #409eff;
  font-weight: 500;
}

.el-icon-delete {
  padding: 4px;
  color: #f56c6c;
  font-weight: 500;
}
</style>
